import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Noteboard from "../noteboard/noteboard.jsx";
import Cities from "../cities/cities.jsx";
import {selectCities} from "../../util/util.js";
import {connect} from "react-redux";
import {ActionsCreator, loadData} from "../../reducers/offers/offers.js";
import withActiveItem from "../../hocs/with-active-item.js";
import withSortOpen from "../../hocs/with-sort-open.js";
import withPlacesSort from "../../hocs/with-places-sort.js";

const WrappedNoteboard = withPlacesSort(withSortOpen(withActiveItem(Noteboard)));

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      activePlace,
      listOffers,
      cities,
      currentCity,
      cityCoords,
      isLoadingFailed,
      onSelect,
      onChange
    } = this.props;

    if (isLoadingFailed) {
      return <main className="page__main page__main--index">
        <div className="cities__places-wrapper">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Server is not avaiable</b>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>;
    }

    return <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <Cities data={cities} currentCity={currentCity} onChange={onChange} />
      </div>
      <WrappedNoteboard
        activePlace={activePlace}
        places={listOffers}
        city={currentCity}
        cityCoords={cityCoords}
        onSelect={onSelect}
      />
    </main>;
  }
  componentDidMount() {
    const {load} = this.props;
    load();
  }
}

MainPage.propTypes = {
  listOffers: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  cityCoords: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  currentCity: PropTypes.string,
  isLoadingFailed: PropTypes.bool,
  activePlace: PropTypes.object,
};

const mapStateToProps = (state) => {
  const cityOffers = [];
  const cities = [];
  const allCoords = [];
  const currentCityCoords = {};
  state[`OFFERS`].listOffers.forEach((item) => {
    cities.push(item.city.name);
  });
  const uniqueCities = Array.from(new Set(cities));
  let currentCityName = uniqueCities[0];
  let filteredOffers = selectCities(state[`OFFERS`].listOffers, uniqueCities[0]);
  if (state[`OFFERS`].city && state[`OFFERS`].city !== uniqueCities[0]) {
    currentCityName = state[`OFFERS`].city;
    filteredOffers = selectCities(state[`OFFERS`].listOffers, state[`OFFERS`].city);
  }
  if (filteredOffers.length) {
    currentCityCoords.location = filteredOffers[0].city.location;
    currentCityCoords.zoom = filteredOffers[0].city.location.zoom;
  }
  filteredOffers.forEach((item) => {
    const place = {};
    place.location = item.city.location;
    cityOffers.push(item);
    allCoords.push(place);
  });
  return {
    listOffers: filteredOffers,
    cities: uniqueCities,
    currentCity: currentCityName,
    cityCoords: currentCityCoords,
    isLoadingFailed: state[`OFFERS`].isLoadingFailed,
    isLoading: state[`OFFERS`].isLoading,
    activePlace: state[`OFFERS`].activeCard,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (city) => {
    dispatch(ActionsCreator[`CHANGE_CITY`](city));
  },
  onSelect: (data) => {
    dispatch(ActionsCreator[`SELECT_CARD`](data));
  },
  load: () => {
    dispatch(loadData(`/hotels`));
  },
});

export {MainPage};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);
