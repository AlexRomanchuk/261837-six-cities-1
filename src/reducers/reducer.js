import {selectCities} from "../util/util.js";

export const initialState = {
  listOffers: [],
  filteredPlaces: [],
  favoritePlaces: [],
  city: null,
  activeCard: null,
  isLoadingFailed: false,
  isLoading: true,
  isFavoritesLoaded: false,
  isAuthorizationRequired: false,
  error: null,
  autorizationError: null,
  user: null,
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
  "LOAD_DATA_FAILURE": (err) => {
    return {
      type: `LOAD_DATA_FAILURE`,
      payload: err
    };
  },
  "LOAD_FAVORITES_SUCCESSFUL": (data) => {
    return {
      type: `LOAD_FAVORITES_SUCCESSFUL`,
      payload: {
        offers: data,
      }
    };
  },
  "LOAD_FAVORITES_FAILURE": (err) => {
    return {
      type: `LOAD_FAVORITES_FAILURE`,
      payload: err
    };
  },
  "SELECT_CARD": (data) => {
    return {
      type: `SELECT_CARD`,
      payload: data
    };
  },
  "REQUIRE_AUTH": (isRegistered) => {
    return {
      type: `REQUIRE_AUTH`,
      payload: isRegistered
    };
  },
  "REGISTER": (data) => {
    return {
      type: `REGISTER`,
      payload: data
    };
  },
  "HANDLE_ERROR_AUTORIZE": (err) => {
    return {
      type: `HANDLE_ERROR_AUTORIZE`,
      payload: err
    };
  },
};

export const loadFavorites = () => (dispatch, _getState, api) => {
  return api.get(`/favorite`)
    .then((response) => {
      const favorites = response.data;
      dispatch(ActionsCreator[`LOAD_FAVORITES_SUCCESSFUL`](favorites));
    })
    .catch((error) => {
      if (error.response.status === 403) {
        dispatch(ActionsCreator[`REQUIRE_AUTH`](true));
      } else {
        dispatch(ActionsCreator[`LOAD_FAVORITES_FAILURE`](error));
      }
    });
};

export const changeFavorites = (place) => (dispatch, _getState, api) => {
  const id = place.id;
  const status = place.isFavorite ? `0` : `1`;
  return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      const offer = response.data;
      dispatch(OffersActionCreator.updateOffer(offer));
    })
    .catch(() => {
    });
};

export const loadData = (path) => (dispatch, _getState, api) => {
  return api.get(path)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        dispatch(ActionsCreator[`LOAD_DATA_SUCCESSFUL`](response.data));
      }
    })
    .catch((error) => {
      if (error.response.status === 403) {
        dispatch(ActionsCreator[`REQUIRE_AUTH`](true));
      } else {
        dispatch(ActionsCreator[`LOAD_DATA_FAILURE`](error));
      }
      return error;
    });
};

export const authorizeUser = (email, password) => (dispatch, _getState, api) => {
  return api.post(`/login`, {email, password})
    .then((response) => {
      dispatch(ActionsCreator[`REGISTER`](response.data));
    })
    .catch((error) => {
      dispatch(ActionsCreator[`HANDLE_ERROR_AUTORIZE`](error.response));
    });
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
      isLoading: false,
    });
    case `LOAD_DATA_FAILURE`: return Object.assign({}, state, {
      isLoadingFailed: true,
      isLoading: false,
      error: action.payload,
    });
    case `LOAD_FAVORITES_SUCCESSFUL`: return Object.assign({}, state, {
      favoritePlaces: action.payload.offers,
      isFavoritesLoaded: true,
    });
    case `LOAD_FAVORITES_FAILURE`: return Object.assign({}, state, {
      isLoadingFailed: true,
      isLoading: false,
      error: action.payload,
    });
    case `SELECT_CARD`: return Object.assign({}, state, {
      activeCard: action.payload,
    });
    case `REQUIRE_AUTH`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });
    case `HANDLE_ERROR_AUTORIZE`: return Object.assign({}, state, {
      isAuthorizationRequired: true,
      autorizationError: action.payload,
    });
    case `REGISTER`: return Object.assign({}, state, {
      isAuthorizationRequired: false,
      user: action.payload,
    });
    default: return state;
  }
};
