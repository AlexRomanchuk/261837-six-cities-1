import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import Map from "../map/map.jsx";

const Noteboard = (props) => {
  const {
    city,
    cityCoords,
    isSortOpen,
    activeParameter,
    parameters,
    places,
    activePlace,
    onClick,
    onSortClick,
    onOpenSortClick,
    isLoadingFailed,
    isLoading
  } = props;

  let sortedPlaces = [...places];

  if (activeParameter.action) {
    sortedPlaces = sortedPlaces.sort(activeParameter.action);
  }

  if (isLoading) {
    return <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">Loading...</b>
            <p className="cities__status-description">Data is loading from server.</p>
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>;
  }

  if (isLoadingFailed) {
    return <div className="cities__places-wrapper">
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
    </div>;
  }

  if (!sortedPlaces.length) {
    return <div className="cities__places-wrapper">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property availbale at the moment in {city}</p>
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>;
  }

  return <div className="cities__places-wrapper">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedPlaces.length} places to stay in {city}</b>
        <div className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by&nbsp;</span>
          <span className="places__sorting-type" tabIndex="0" onClick={onOpenSortClick}>
            {activeParameter.name}
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul
            className={`places__options places__options--custom ${isSortOpen ? `places__options--opened` : ``}`}
            onClick={onOpenSortClick}
          >
            {parameters.map((parameter) => {
              return <li
                className={`places__option ${parameter === activeParameter ? `places__option--active` : ``}`}
                tabIndex="0"
                key={parameter.name}
                onClick={() => onSortClick(parameter)}
              >{parameter.name}</li>;
            })}
          </ul>
        </div>
        <div className="cities__places-list places__list tabs__content">
          {sortedPlaces.map((item, i) => <Card
            key={i}
            place={item}
            onClick={(evt) => {
              evt.preventDefault();
              onClick(item);
            }}
          />)}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            city={cityCoords}
            places={sortedPlaces}
            activePlace={activePlace}
          />
        </section>
      </div>
    </div>
  </div>;
};

Noteboard.propTypes = {
  places: PropTypes.array.isRequired,
  cityCoords: PropTypes.object.isRequired,
  city: PropTypes.string,
  activePlace: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSortOpen: PropTypes.bool.isRequired,
  onOpenSortClick: PropTypes.func.isRequired,
  activeParameter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    action: PropTypes.func,
  }).isRequired,
  parameters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    action: PropTypes.func,
  }).isRequired).isRequired,
  onSortClick: PropTypes.func.isRequired,
  isLoadingFailed: PropTypes.bool,
  isLoading: PropTypes.bool,
};


export default Noteboard;
