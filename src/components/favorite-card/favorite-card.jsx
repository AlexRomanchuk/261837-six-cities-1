import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {removeFromFavorites} from "../../reducers/favorites/favorites.js";
import {Link} from "react-router-dom";

const FavoriteCard = (props) => {
  const {offer, onRemoveBookmarkClick} = props;
  return <article className="favorites__card place-card">
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <Link to={`/offer/${offer.id}`}>
        <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
      </Link>
    </div>
    <div className="favorites__card-info place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={() => {
          onRemoveBookmarkClick(offer);
        }}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `&{offer.rating}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>;
};

FavoriteCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
  onRemoveBookmarkClick: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveBookmarkClick: (offer) => dispatch(removeFromFavorites(offer)),
});

export {FavoriteCard};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCard);
