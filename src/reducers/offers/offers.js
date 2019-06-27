import {parseOffer, selectCities} from "../../util/util.js";

const CODE_OK = 200;

export const initialState = {
  listOffers: [],
  filteredPlaces: [],
  city: null,
  activeCard: null,
  isLoading: true,
  isLoadingFailed: false,
  isLoaded: false,
  error: null,
};

// блок действий

export const ActionsCreator = {
  "CHANGE_CITY": (city) => {
    let currentCity = city;
    return {
      type: `CHANGE_CITY`,
      payload: {
        city: currentCity,
      },
    };
  },
  "LOAD_DATA_SUCCESSFUL": (data) => {
    return {
      type: `LOAD_DATA_SUCCESSFUL`,
      payload: {
        offers: data,
      },
    };
  },
  "LOAD_DATA_FAILURE": (err) => {
    return {
      type: `LOAD_DATA_FAILURE`,
      payload: err,
    };
  },
  "SELECT_CARD": (data) => {
    return {
      type: `SELECT_CARD`,
      payload: data,
    };
  },
  "UPDATE_OFFER": (offer) => {
    return {
      type: `UPDATE_OFFER`,
      payload: offer,
    };
  },
};

// блок подключений

export const loadData = (path) => (dispatch, _getState, api) => {
  return api.get(path)
    .then((response) => {
      if (response.status === CODE_OK) {
        const offers = response.data.map((it) => parseOffer(it));
        dispatch(ActionsCreator[`LOAD_DATA_SUCCESSFUL`](offers));
      }
    })
    .catch((error) => {
      dispatch(ActionsCreator[`LOAD_DATA_FAILURE`](error));
      return error;
    });
};

// блок управления

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload.city,
      listOffers: state.listOffers,
      filteredPlaces: selectCities(state.listOffers, action.payload.city),
      activeCard: null,
    });
    case `LOAD_DATA_SUCCESSFUL`: return Object.assign({}, state, {
      isLoading: false,
      isLoaded: true,
      listOffers: action.payload.offers,
    });
    case `LOAD_DATA_FAILURE`: return Object.assign({}, state, {
      isLoading: false,
      isLoadingFailed: true,
      error: action.payload,
    });
    case `SELECT_CARD`: return Object.assign({}, state, {
      activeCard: action.payload,
    });
    case `UPDATE_OFFER`: return Object.assign({}, state, {
      listOffers: state.listOffers.map((offer) => {
        if (offer.id === action.payload.id) {
          return action.payload;
        }
        return offer;
      }),
    });
    default: return state;
  }
};
