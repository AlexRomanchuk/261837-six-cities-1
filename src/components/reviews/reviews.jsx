import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadComments} from "../../reducers/reducer.js";
import {format} from "date-fns";

class Reviews extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {reviews, isLoaded, isLoading} = this.props;

    if (isLoading) {
      return <h2 className="reviews__title">Loading...</h2>;
    }

    if (!isLoaded) {
      return <h2 className="reviews__title">Error on loading comments.</h2>;
    }

    if (!reviews || !reviews.length) {
      return <h2 className="reviews__title">No reviews</h2>;
    }

    const sortedReviews = reviews.sort((comment1, comment2) => {
      return new Date(comment2.date) - new Date(comment1.date);
    }).slice(0, 10);

    return <div>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => {
          return <li className="reviews__item" key={review.id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                {review.user.name}
              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${review.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">
                {review.comment}
              </p>
              <time className="reviews__time" dateTime={format(new Date(review.date), `YYYY-MM-DD`)}>{format(new Date(review.date), `MMM YYYY`)}</time>
            </div>
          </li>;
        })}
      </ul>
    </div>;
  }
  componentDidMount() {
    const {offerId, load} = this.props;
    load(offerId);
  }
}

Reviews.propTypes = {
  load: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  })),
  isLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  reviews: state.comments,
  isLoaded: state.isCommentsLoaded,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  load: (id) => dispatch(loadComments(id))
});

export {Reviews};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
