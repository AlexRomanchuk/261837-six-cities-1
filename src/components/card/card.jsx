import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
  const {
    place,
    onClick
  } = props;
  return <article className="cities__place-card place-card">
    {place.isPremium && (<div className="place-card__mark">
      <span>Premium</span>
    </div>)}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#" onClick={onClick}>
        <img className="place-card__image" src={place.src} width="260" height="200" alt="Place image" />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{place.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${place.rating}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{place.title}</a>
      </h2>
      <p className="place-card__type">{place.type}</p>
    </div>
  </article>;
};

Card.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`, `House`, `Hotel`]).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Card;
