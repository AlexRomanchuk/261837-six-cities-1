import {selectCities, parseOffer, parseComment, parseAuthorizationData} from "../util/util.js";

const Status = {
  OK: 200,
  BAD_DATA: 400
};

export const initialState = {
  rating: 0,
  comment: ``,
  listOffers: [],
  filteredPlaces: [],
  favoritePlaces: [],
  comments: [],
  city: null,
  activeCard: null,
  isLoading: true,
  isLoadingFailed: false,
  isFavoritesLoading: true,
  isFavoritesLoaded: false,
  isCommentsLoading: true,
  isCommentsLoaded: false,
  isCommentSending: false,
  isCommentSended: false,
  error: null,
  autorizationError: null,
  user: null,
  commentError: null,
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
  "LOAD_FAVORITES_SUCCESSFUL": (data) => {
    return {
      type: `LOAD_FAVORITES_SUCCESSFUL`,
      payload: {
        offers: data,
      }
    };
  },
  "LOAD_COMMENTS_SUCCESSFUL": (data) => {
    return {
      type: `LOAD_COMMENTS_SUCCESSFUL`,
      payload: {
        comments: data,
      }
    };
  },
  "LOAD_FAVORITES_FAILURE": (err) => {
    return {
      type: `LOAD_FAVORITES_FAILURE`,
      payload: err,
    };
  },
  "LOAD_COMMENTS_FAILURE": (err) => {
    return {
      type: `LOAD_COMMENTS_FAILURE`,
      payload: err,
    };
  },
  "SELECT_CARD": (data) => {
    return {
      type: `SELECT_CARD`,
      payload: data,
    };
  },
  "REGISTER": (data) => {
    return {
      type: `REGISTER`,
      payload: data,
    };
  },
  "HANDLE_ERROR_AUTORIZE": (err) => {
    return {
      type: `HANDLE_ERROR_AUTORIZE`,
      payload: err,
    };
  },
  "UPDATE_OFFER": (offer) => {
    return {
      type: `UPDATE_OFFER`,
      payload: offer,
    };
  },
  "REMOVE_FAVORITE": (place) => {
    return {
      type: `REMOVE_FAVORITE`,
      payload: place,
    };
  },
  "COMMENT_SENDING": (isSending) => {
    return {
      type: `COMMENT_SENDING`,
      payload: isSending,
    };
  },
  "COMMENT_ERROR": (error) => {
    return {
      type: `COMMENT_ERROR`,
      payload: error,
    };
  },
  "COMMENT_SENDED": () => {
    return {
      type: `COMMENT_SENDED`,
    };
  },
  "RATING_INPUT": (rating) => {
    return {
      type: `RATING_INPUT`,
      payload: rating,
    };
  },
  "COMMENT_INPUT": (comment) => {
    return {
      type: `COMMENT_INPUT`,
      payload: comment,
    };
  },
  "FORM_RESET": () => {
    return {
      type: `FORM_RESET`,
    };
  },
};

// блок подключений

export const sendReview = (placeId, comment) => (dispatch, _getState, api) => {
  dispatch(ActionsCreator[`COMMENT_ERROR`](null));
  dispatch(ActionsCreator[`COMMENT_SENDING`](true));
  return api.post(`/comments/${placeId}`, comment)
    .then((response) => {
      dispatch(ActionsCreator[`COMMENT_SENDING`](false));
      dispatch(ActionsCreator[`COMMENT_SENDED`]());
      dispatch(ActionsCreator[`FORM_RESET`]());
      const comments = response.data.map((it) => parseComment(it));
      dispatch(ActionsCreator[`LOAD_COMMENTS_SUCCESSFUL`](comments));
    })
    .catch((error) => {
      dispatch(ActionsCreator[`COMMENT_SENDING`](false));
      let errorString = `Send review error!`;
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.status === Status.BAD_DATA) {
          errorString = `All fields are required.`;
        }
      }
      dispatch(ActionsCreator[`COMMENT_ERROR`](errorString));
    });
};

export const loadComments = (offerId) => (dispatch, _getState, api) => {
  return api.get(`/comments/${offerId}`)
    .then((response) => {
      const comments = response.data.map((it) => parseComment(it));
      dispatch(ActionsCreator[`LOAD_COMMENTS_SUCCESSFUL`](comments));
    })
    .catch((error) => {
      dispatch(ActionsCreator[`LOAD_COMMENTS_FAILURE`](error));
    });
};

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
      dispatch(ActionsCreator[`UPDATE_OFFER`](offer));
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

export const loadData = (path) => (dispatch, _getState, api) => {
  return api.get(path)
    .then((response) => {
      if (response.status === Status.OK) {
        const offers = response.data.map((it) => parseOffer(it));
        dispatch(ActionsCreator[`LOAD_DATA_SUCCESSFUL`](offers));
      }
    })
    .catch((error) => {
      dispatch(ActionsCreator[`LOAD_DATA_FAILURE`](error));
      return error;
    });
};

export const authorizeUser = (email, password) => (dispatch, _getState, api) => {
  return api.post(`/login`, {email, password})
    .then((response) => {
      const user = parseAuthorizationData(response.data);
      dispatch(ActionsCreator[`REGISTER`](user));
    })
    .catch((error) => {
      dispatch(ActionsCreator[`HANDLE_ERROR_AUTORIZE`](error.response));
    });
};

export const loadAuthorizationData = () => (dispatch, _getState, api) => {
  return api.get(`/login`)
    .then((response) => {
      const user = parseAuthorizationData(response.data);
      dispatch(ActionsCreator[`REGISTER`](user));
    })
    .catch(() => {
      dispatch(ActionsCreator[`REGISTER`](null));
    });
};

export const unauthorizeUser = () => (dispatch, _getState, api) => {
  return api.get(`/logout`)
    .finally(() => {
      dispatch(ActionsCreator[`REGISTER`](null));
      dispatch(loadData(`/hotels`));
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
      listOffers: action.payload.offers,
    });
    case `LOAD_DATA_FAILURE`: return Object.assign({}, state, {
      isLoading: false,
      isLoadingFailed: true,
      error: action.payload,
    });
    case `LOAD_FAVORITES_SUCCESSFUL`: return Object.assign({}, state, {
      isFavoritesLoading: false,
      favoritePlaces: action.payload.offers,
      isFavoritesLoaded: true,
    });
    case `LOAD_COMMENTS_SUCCESSFUL`: return Object.assign({}, state, {
      comments: action.payload.comments,
      isCommentsLoading: false,
      isCommentsLoaded: true,
    });
    case `LOAD_FAVORITES_FAILURE`: return Object.assign({}, state, {
      isFavoritesLoading: false,
      isFavoritesLoaded: false,
      error: action.payload,
    });
    case `LOAD_COMMENTS_FAILURE`: return Object.assign({}, state, {
      isCommentsLoading: false,
      isCommentsLoaded: false,
      error: action.payload,
    });
    case `SELECT_CARD`: return Object.assign({}, state, {
      activeCard: action.payload,
    });
    case `HANDLE_ERROR_AUTORIZE`: return Object.assign({}, state, {
      autorizationError: action.payload,
    });
    case `REGISTER`: return Object.assign({}, state, {
      user: action.payload,
    });
    case `UPDATE_OFFER`: return Object.assign({}, state, {
      listOffers: state.listOffers.map((offer) => {
        if (offer.id === action.payload.id) {
          return action.payload;
        }
        return offer;
      }),
    });
    case `REMOVE_FAVORITE`: return Object.assign({}, state, {
      favoritePlaces: state.favoritePlaces.filter((it) => it.id !== action.payload.id),
    });
    case `COMMENT_ERROR`: return Object.assign({}, state, {
      commentError: action.payload,
    });
    case `COMMENT_SENDING`: return Object.assign({}, state, {
      isCommentSending: action.payload,
    });
    case `COMMENT_INPUT`: return Object.assign({}, state, {
      comment: action.payload,
    });
    case `RATING_INPUT`: return Object.assign({}, state, {
      rating: action.payload,
    });
    case `FORM_RESET`: return Object.assign({}, state, {
      rating: 0,
      comment: ``,
    });
    case `COMMENT_SENDED`: return Object.assign({}, state, {
      isCommentSended: true,
    });
    default: return state;
  }
};
