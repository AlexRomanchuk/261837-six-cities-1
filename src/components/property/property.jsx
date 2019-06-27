import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Loading from "../loading/loading.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import Reviews from "../reviews/reviews.jsx";
import {connect} from "react-redux";
import {changeFavorites} from "../../reducers/favorites/favorites.js";
import {loadData} from "../../reducers/offers/offers.js";
import {getTreeNearPlaces, getOfferById} from "../../util/util.js";
import Map from "../map/map.jsx";
import {Link} from "react-router-dom";

const PlaceTypes = {
  apartment: `Apartment`,
  room: `Private Room`,
  house: `House`,
  hotel: `Hotel`,
};

class Property extends PureComponent {
  constructor(props) {
    super(props);
    this._handelBookmarksClick = this._handelBookmarksClick.bind(this);
  }
  render() {
    const {isLoaded, user, offer, nearOffers, onBookmarksClick} = this.props;
    if (!isLoaded) {
      return <Loading />;
    }
    return <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.slice(0, 6).map((image, i) =>
              <div className="property__image-wrapper" key={i}>
                <img className="property__image" src={image} alt="Photo studio" />
              </div>
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offer.isPremium && <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
              <button className={`property__bookmark-button button ${offer.isFavorite && `property__bookmark-button--active`}`} type="button" onClick={this._handelBookmarksClick}>
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${offer.rating * 20}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {PlaceTypes[offer.type] || `Entire place`}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((good, i) => <li className="property__inside-item" key={i}>
                  {good}
                </li>
                )}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={`/${offer.host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro && <span className="property__user-status">
                  Pro
                </span>}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <Reviews offerId={offer.id} />
              {user && <ReviewsForm offerId={offer.id} />}
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map
            city={offer.city}
            places={[...nearOffers, offer]}
            activePlace={offer}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOffers.map((nearOffer, i) => <article className="near-places__card place-card" key={i}>
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <Link to={`/jsredir/${nearOffer.id}`}>
                  <img className="place-card__image" src={nearOffer.previewImage} width="260" height="200" alt="Place image" />
                </Link>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;{nearOffer.price}</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                  </div>
                  <button className={`place-card__bookmark-button button ${nearOffer.isFavorite && `place-card__bookmark-button--active`}`} type="button" onClick={() => {
                    onBookmarksClick(nearOffer);
                  }}>
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">In bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{width: `${Math.round(nearOffer.rating) * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <Link to={`/jsredir/${nearOffer.id}`}>{nearOffer.title}</Link>
                </h2>
                <p className="place-card__type">{nearOffer.type}</p>
              </div>
            </article>
            )}
          </div>
        </section>
      </div>
    </main>;
  }
  componentDidMount() {
    const {load} = this.props;
    load();
  }
  _handelBookmarksClick() {
    const {offer, onBookmarksClick} = this.props;
    onBookmarksClick(offer);
  }
}

Property.propTypes = {
  load: PropTypes.func.isRequired,
  onBookmarksClick: PropTypes.func.isRequired,
  nearOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  isLoaded: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state[`USER`].user,
  isLoaded: state[`OFFERS`].isLoaded,
  offer: getOfferById(state[`OFFERS`], ownProps.match.params.id),
  nearOffers: getTreeNearPlaces(state[`OFFERS`], getOfferById(state[`OFFERS`], ownProps.match.params.id), 3),
});

const mapDispatchToProps = (dispatch) => ({
  onBookmarksClick: (offer) => dispatch(changeFavorites(offer)),
  load: () => dispatch(loadData(`/hotels`)),
});

export {Property};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
