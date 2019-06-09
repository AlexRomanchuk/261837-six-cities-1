import React from "react";
import PropTypes from "prop-types";
import Noteboard from "../noteboard/noteboard.jsx";
import Loading from "../loading/loading.jsx";
import Property from "../property/property.jsx";
import Login from "../login/login.jsx";
import Cities from "../cities/cities.jsx";
import Favorites from "../Favorites/Favorites.jsx";
import {ActionsCreator, authorizeUser} from "../../reducers/reducer.js";
import {selectCities} from "../../util/util.js";
import {Switch, Route, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import withActiveItem from "../../hocs/with-active-item.js";
import withSortOpen from "../../hocs/with-sort-open.js";
import withPlacesSort from "../../hocs/with-places-sort.js";
import withFormHandler from "../../hocs/with-form-handler.js";

const WrappedNoteboard = withPlacesSort(withSortOpen(withActiveItem(Noteboard)));
const WrappedLogin = withFormHandler(Login);

const Main = (props) => {
  const {
    listOffers,
    cities,
    currentCity,
    cityCoords,
    onChange,
    isLoadingFailed,
    isLoading,
    onSelect,
    activePlace,
    isAuthorizationRequired,
    onSubmitForm,
    autorizationError,
    user,
    error,
  } = props;

  const PreparedLoginPage = () => {
    return <WrappedLogin onSubmitForm={onSubmitForm} autorizationError={autorizationError} user={user} />;
  };

  if (isAuthorizationRequired) {
    return <Redirect to="/login" />
  }

  return <div>
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
    </div>

    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {user ?
                  <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">{user.email}</span>
                  </Link > :
                  <Link to="/login" className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <Switch>
      <Route path="/" exact render={() => isLoading ? <Loading /> :
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="cities tabs">
            <Cities data={cities} currentCity={currentCity} onChange={onChange} />
          </div>
          <WrappedNoteboard
            activePlace={activePlace}
            places={listOffers}
            city={currentCity}
            cityCoords={cityCoords}
            isLoadingFailed={isLoadingFailed}
            error={error}
            isLoading={isLoading}
            onSelect={onSelect}
          />
        </main>
      }/>
      <Route path="/login" component={PreparedLoginPage} />
      <Route path="/favorites" component={Favorites} />
      {listOffers.map((item, i) => {
        return <Route exact path={`/offer/${item.id}`} render={() => <Property offer={item} />} key={i} />;
      })}
    </Switch>

    <footer className="footer">
      <Link className="footer__logo-link" to="/">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  </div>;
};

Main.propTypes = {
  listOffers: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  cityCoords: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  currentCity: PropTypes.string,
  isLoadingFailed: PropTypes.bool,
  isLoading: PropTypes.bool,
  activePlace: PropTypes.object,
  isAuthorizationRequired: PropTypes.bool,
  error: PropTypes.object,
  autorizationError: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  const cityOffers = [];
  const cities = [];
  const allCoords = [];
  const currentCityCoords = {};
  state.listOffers.forEach((item) => {
    cities.push(item.city.name);
  });
  const uniqueCities = Array.from(new Set(cities));
  let currentCityName = uniqueCities[0];
  let filteredOffers = selectCities(state.listOffers, uniqueCities[0]);
  if (state.city && state.city !== uniqueCities[0]) {
    currentCityName = state.city;
    filteredOffers = selectCities(state.listOffers, state.city);
  }
  if (filteredOffers.length) {
    currentCityCoords.coordinates = filteredOffers[0].city.location;
    currentCityCoords.zoom = filteredOffers[0].city.location.zoom;
  }
  filteredOffers.forEach((item) => {
    const place = {};
    place.coordinates = item.city.location;
    cityOffers.push(item);
    allCoords.push(place);
  });
  return {
    listOffers: filteredOffers,
    cities: uniqueCities,
    coordsOffers: allCoords,
    currentCity: currentCityName,
    cityCoords: currentCityCoords,
    isLoadingFailed: state.isLoadingFailed,
    isLoading: state.isLoading,
    activePlace: state.activeCard,
    isAuthorizationRequired: state.isAuthorizationRequired,
    error: state.error,
    autorizationError: state.autorizationError,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (city) => {
    dispatch(ActionsCreator[`CHANGE_CITY`](city));
  },
  onSelect: (data) => {
    dispatch(ActionsCreator[`SELECT_CARD`](data));
  },
  onSubmitForm: (formData) => {
    dispatch(authorizeUser(formData.email, formData.password));
  },
});

export {Main};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
