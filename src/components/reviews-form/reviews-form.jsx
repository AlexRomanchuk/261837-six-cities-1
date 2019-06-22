import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {ActionsCreator, sendReview} from "../../reducers/reducer.js";
import {connect} from "react-redux";

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
  }
  render() {
    const {invalid, sending, sendingError, onRatingSelect, onTextChange, formData} = this.props;
    return <form className="reviews__form form" action="#" method="post" disabled={sending} onSubmit={(evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
    }}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={(evt) => {
          onRatingSelect(evt);
        }} checked={formData.rating === 5 ? true : false} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={(evt) => {
          onRatingSelect(evt);
        }} checked={formData.rating === 4 ? true : false} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={(evt) => {
          onRatingSelect(evt);
        }} checked={formData.rating === 3 ? true : false} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={(evt) => {
          onRatingSelect(evt);
        }} checked={formData.rating === 2 ? true : false} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={(evt) => {
          onRatingSelect(evt);
        }} checked={formData.rating === 1 ? true : false} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" value={formData.comment} placeholder="Tell how was your stay, what you like and what can be improved" onChange={(evt) => {
        onTextChange(evt);
      }}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={invalid || sending}>Submit</button>
      </div>
      {sendingError && <div className="reviews__button-wrapper">
        <p style={{color: `red`}}>{sendingError}</p>
      </div>}
    </form>;
  }
  componentWillUnmount() {
    const {formReset} = this.props;
    formReset();
  }
  _handleSubmitForm() {
    const {offerId, onSend, formData} = this.props;
    onSend(offerId, formData);
  }
}

ReviewsForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  invalid: PropTypes.bool.isRequired,
  onSend: PropTypes.func.isRequired,
  onRatingSelect: PropTypes.func.isRequired,
  formReset: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  sending: PropTypes.bool,
  sended: PropTypes.bool,
  sendingError: PropTypes.string,
  formData: PropTypes.object,
};

const Lenght = {
  MIN: 50,
  MAX: 300,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  sending: state.isCommentSending,
  sended: state.isCommentSended,
  sendingError: state.commentError,
  invalid: (!state.rating || state.rating === 0 || state.comment.length < Lenght.MIN || state.comment.length > Lenght.MAX) ? true : false,
  formData: {
    rating: Number(state.rating),
    comment: state.comment,
  },
});

const mapDispatchToProps = (dispatch) => ({
  onRatingSelect: (evt) => dispatch(ActionsCreator[`RATING_INPUT`](evt.target.value)),
  onTextChange: (evt) => dispatch(ActionsCreator[`COMMENT_INPUT`](evt.target.value)),
  onSend: (placeId, comment) => dispatch(sendReview(placeId, comment)),
  formReset: () => dispatch(ActionsCreator[`FORM_RESET`]()),
});

export {ReviewsForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsForm);
