import {offers} from "../mocks/offers.js";

export const initialState = {
  city: `Amsterdam`,
  cityCoords: [52.38333, 4.9],
};

export const ActionsCreator = {
  "CHANGE_CITY": (city) => {
    let currentCity = city;
    return {
      type: `CHANGE_CITY`,
      payload: currentCity
    }
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload
    });
  }
};
