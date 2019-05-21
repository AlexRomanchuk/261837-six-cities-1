import {offers} from "../mocks/offers.js";
import {selectCities} from "../util/util.js";

export const initialState = {
  listOffers: offers,
  city: `Amsterdam`,
  cityCoords: [52.38333, 4.9],
};

export const ActionsCreator = {
  "CHANGE_CITY": (city) => {
    let currentCity = city;
    const filtered = selectCities(offers, city);
    return {
      type: `CHANGE_CITY`,
      payload: {
        city: currentCity,
        offers: filtered.result,
        coords: filtered.coords
      }
    };
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload.city,
      listOffers: action.payload.offers,
      cityCoords: action.payload.coords
    });
    default: return state;
  }
};
