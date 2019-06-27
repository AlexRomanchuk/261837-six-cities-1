import {parseOffer} from "../../util/util.js";
import {ActionsCreator as OffersActionsCreator} from "../offers/offers.js";

export const initialState = {
  favoritePlaces: [],
  isFavoritesLoading: true,
  isFavoritesLoaded: false,
  favoritesError: null,
};

// блок действий

export const ActionsCreator = {
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
      payload: err,
    };
  },
  "REMOVE_FAVORITE": (place) => {
    return {
      type: `REMOVE_FAVORITE`,
      payload: place,
    };
  },
};

// блок подключений

export const loadFavorites = () => (dispatch, _getState, api) => {
  return api.get(`/favorite`)
    .then((response) => {
      const favorites = response.data.map((offer) => parseOffer(offer));
      dispatch(ActionsCreator[`LOAD_FAVORITES_SUCCESSFUL`](favorites));
    })
    .catch((error) => {
      dispatch(ActionsCreator[`LOAD_FAVORITES_FAILURE`](error));
    });
};

export const changeFavorites = (place) => (dispatch, _getState, api) => {
  const id = place.id;
  const status = place.isFavorite ? `0` : `1`;
  return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      const offer = parseOffer(response.data);
      dispatch(OffersActionsCreator[`UPDATE_OFFER`](offer));
    })
    .catch(() => {
    });
};

export const removeFromFavorites = (place) => (dispatch, _getState, api) => {
  return api.post(`/favorite/${place.id}/0`)
    .then((response) => {
      const offer = parseOffer(response.data);
      dispatch(ActionsCreator[`REMOVE_FAVORITE`](offer));
    })
    .catch(() => {
    });
};

// блок управления

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FAVORITES_SUCCESSFUL`: return Object.assign({}, state, {
      isFavoritesLoading: false,
      favoritePlaces: action.payload.offers,
      isFavoritesLoaded: true,
    });
    case `LOAD_FAVORITES_FAILURE`: return Object.assign({}, state, {
      isFavoritesLoading: false,
      isFavoritesLoaded: false,
      favoritesError: action.payload,
    });
    case `REMOVE_FAVORITE`: return Object.assign({}, state, {
      favoritePlaces: state.favoritePlaces.filter((it) => it.id !== action.payload.id),
    });
    default: return state;
  }
};
