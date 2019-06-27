import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadFavorites} from "../../reducers/favorites/favorites.js";
import FavoriteCard from "../favorite-card/favorite-card.jsx";
import {getOrderedFavorites} from "../../util/util.js";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    const {favorites, isLoading, isLoaded} = this.props;
    if (isLoading) {
      return <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__places">
                  <h2>Loading...</h2>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>;
    }
    if (!isLoaded) {
      return <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Error on loading favorites.</b>
            </div>
          </section>
        </div>
      </main>;
    }
    if (!favorites || !favorites.length) {
      return <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
            </div>
          </section>
        </div>
      </main>;
    }
    return <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {favorites.map((it) => {
              return <li key={it.city.name} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{it.city.name}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {it.offers.map((offer) => {
                    return <FavoriteCard offer={offer} key={offer.id} />;
                  })}
                </div>
              </li>;
            })}
          </ul>
        </section>
      </div>
    </main>;
  }
}

Favorites.propTypes = {
  loadData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    offers: PropTypes.array,
  })),
};

const mapStateToProps = (state) => {
  const sortedFavorites = getOrderedFavorites(state[`FAVORITES`].favoritePlaces);
  return {
    isLoading: state[`FAVORITES`].isFavoritesLoading,
    isLoaded: state[`FAVORITES`].isFavoritesLoaded,
    favorites: sortedFavorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(loadFavorites()),
});

export {Favorites};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
