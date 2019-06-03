import {selectCities} from "../util/util.js";

export const initialState = {
  listOffers: [],
  filteredPlaces: [],
  city: null,
  activeCard: null,
  isLoadingFailed: false,
  isLoading: true
};

export const ActionsCreator = {
  "CHANGE_CITY": (city) => {
    let currentCity = city;
    return {
      type: `CHANGE_CITY`,
      payload: {
        city: currentCity,
      }
    };
  },
  "LOAD_DATA_SUCCESSFUL": (data) => {
    return {
      type: `LOAD_DATA_SUCCESSFUL`,
      payload: {
        offers: data,
      }
    };
  },
  "DATA_LOAD_FAILURE": () => {
    return {
      type: `DATA_LOAD_FAILURE`
    };
  },
  "SELECT_CARD": (data) => {
    return {
      type: `SELECT_CARD`,
      payload: data
    };
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload.city,
      listOffers: state.listOffers,
      filteredPlaces: selectCities(state.listOffers, action.payload.city),
      activeCard: null,
    });
    case `LOAD_DATA_SUCCESSFUL`: return Object.assign({}, state, {
      listOffers: action.payload.offers,
      isLoading: false
    });
    case `LOAD_DATA_FAILURE`: return Object.assign({}, state, {
      isLoadingFailed: true,
    });
    case `SELECT_CARD`: return Object.assign({}, state, {
      activeCard: action.payload,
    });
    default: return state;
  }
};
