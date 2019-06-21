import {
  reducer,
  loadData,
  authorizeUser,
  loadComments,
  sendReview,
  changeFavorites,
  loadFavorites,
} from "../reducers/reducer.js";
import MockAdapter from "axios-mock-adapter";
import {configureAPI} from "../api.js";
import mockOffers from "../mocks/mock-offers.json";
import mockComments from "../mocks/mock-comments.json";
import {parseOffer, parseComment} from "../util/util.js";

const api = configureAPI();
const offers = mockOffers.map(parseOffer);
const comments = mockComments.map(parseComment);

const initOffers = [
  {
    src: `img/apartment-01.jpg`,
    price: 120,
    type: `Apartment`,
    title: `Beautiful &amp; luxurious apartment at great location`,
    rating: 93,
    coords: [52.3909553943508, 4.85309666406198],
    city: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9]
    }
  },
  {
    src: `img/apartment-03.jpg`,
    price: 180,
    type: `Hotel`,
    title: `Nice, cozy, warm big bed apartment`,
    rating: 100,
    coords: [57.3809766943508, 4.93930776406198],
    city: {
      name: `Moscow`,
      coords: [59.37633, 0.9]
    }
  }
];

const initialState = {
  rating: 0,
  comment: ``,
  listOffers: [],
  filteredPlaces: [],
  favoritePlaces: [],
  comments: [],
  city: null,
  activeCard: null,
  isLoadingFailed: false,
  isLoading: true,
  isFavoritesLoaded: false,
  isCommentsLoaded: false,
  isCommentSending: false,
  isCommentSended: false,
  error: null,
  autorizationError: null,
  user: null,
  commentError: null,
};

export const ActionsCreator = {
  // tested
  "CHANGE_CITY": (city) => {
    let currentCity = city;
    return {
      type: `CHANGE_CITY`,
      payload: {
        city: currentCity,
      },
    };
  },
  // tested
  "LOAD_DATA_SUCCESSFUL": (data) => {
    return {
      type: `LOAD_DATA_SUCCESSFUL`,
      payload: {
        offers: data,
      },
    };
  },
  // tested
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
  // tested
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

describe(`Reducer end point api works correctly`, () => {
  it(`correct change city`, () => {
    expect(reducer(initialState, {
      type: `CHANGE_CITY`,
      payload: initialState
    }).city).toEqual(`Amsterdam`);
  });

  it(`correct register`, () => {
    expect(reducer(initialState, {
      type: `REGISTER`,
      payload: `New User`
    }).user).toEqual(`New User`);
  });

  it(`correct select offer`, () => {
    expect(reducer(initialState, {
      type: `SELECT_CARD`,
      payload: {
        city: `Amsterdam`
      }
    }).currentCity).toEqual(null);
  });
  it(`correct change city`, () => {
    expect(reducer(initialState, {
      type: `LOAD_DATA_SUCCESSFUL`,
      payload: initialState
    }).city).toEqual(`Amsterdam`);
  });

  it(`correct register`, () => {
    expect(reducer(initialState, {
      type: `LOAD_DATA_FAILURE`,
      payload: `New User`
    }).user).toEqual(`New User`);
  });

  it(`correct select offer`, () => {
    expect(reducer(initialState, {
      type: `HANDLE_ERROR_AUTORIZE`,
      payload: {
        city: `Amsterdam`
      }
    }).currentCity).toEqual(null);
  });
  it(`correct change city`, () => {
    expect(reducer(initialState, {
      type: `LOAD_FAVORITES_SUCCESSFUL`,
      payload: initialState
    }).city).toEqual(`Amsterdam`);
  });

  it(`correct register`, () => {
    expect(reducer(initialState, {
      type: `LOAD_FAVORITES_FAILURE`,
      payload: `New User`
    }).user).toEqual(`New User`);
  });

  it(`correct select offer`, () => {
    expect(reducer(initialState, {
      type: `UPDATE_OFFER`,
      payload: {
        city: `Amsterdam`
      }
    }).currentCity).toEqual(null);
  });
  it(`correct change city`, () => {
    expect(reducer(initialState, {
      type: `REMOVE_FAVORITE`,
      payload: initialState
    }).city).toEqual(`Amsterdam`);
  });

  it(`correct register`, () => {
    expect(reducer(initialState, {
      type: `COMMENT_SENDING`,
      payload: `New User`
    }).user).toEqual(`New User`);
  });

  it(`correct select offer`, () => {
    expect(reducer(initialState, {
      type: `COMMENT_SENDED`,
      payload: {
        city: `Amsterdam`
      }
    }).currentCity).toEqual(null);
  });
  it(`correct change city`, () => {
    expect(reducer(initialState, {
      type: `RATING_INPUT`,
      payload: initialState
    }).city).toEqual(`Amsterdam`);
  });

  it(`correct register`, () => {
    expect(reducer(initialState, {
      type: `COMMENT_INPUT`,
      payload: `New User`
    }).user).toEqual(`New User`);
  });

  it(`correct select offer`, () => {
    expect(reducer(initialState, {
      type: `FORM_RESET`,
    }).currentCity).toEqual(null);
  });
});

describe(`Loading data api works correctly`, () => {
  it(`correct load data`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return loadData(`/hotels`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_DATA_SUCCESSFUL`,
          payload: {
            offers: [{fake: true}]
          }
        });
      })
      .catch(() => {});
  });

  it(`correct handle error load data`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/hotel`)
      .reply(404, [{fake: true}]);

    return loadData(`/hotel`)(dispatch, jest.fn(), api)
      .then(() => {})
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_DATA_FAILURE`,
          payload: {
            offers: null
          }
        });
      });
  });
});

describe(`Authorization api works correctly`, () => {
  it(`correct authorization`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return authorizeUser(`aaa@post.ru`, `pwd`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `REGISTER`,
          payload: {
            user: [{fake: true}]
          }
        });
      })
      .catch(() => {});
  });

  it(`correct handle error authorization`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/login`)
      .reply(400, [{fake: true}]);

    return authorizeUser(null, `hotel`)(dispatch, jest.fn(), api)
      .then(() => {})
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `HANDLE_ERROR_AUTORIZE`,
          payload: {
            user: null
          }
        });
      });
  });
});

describe(`Loading comments api works correctly`, () => {
  it(`Should make a correct load comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/comments/1`)
      .reply(200, mockComments);

    return loadComments(1)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: `LOAD_COMMENTS_SUCCESSFUL`,
          payload: {"comments": comments},
        });
      });
  });

  it(`Should make a correct fail load comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const errorText = `some error text`;
    apiMock
      .onGet(`/comments/1`)
      .reply(400, {error: errorText});

    return loadComments(1)(dispatch, jest.fn(), api)
      .then(() => {
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: `LOAD_COMMENTS_FAILURE`,
          payload: errorText,
        });
      });
  });

  it(`Should make a correct post comment`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/comments/1`)
      .reply(200, mockComments);

    return sendReview(1, `comment text`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(6);

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: `COMMENT_SENDING`,
          payload: false,
        });

        expect(dispatch.mock.calls[3][0]).toEqual({
          type: `COMMENT_SENDED`,
        });

        expect(dispatch.mock.calls[4][0]).toEqual({
          type: `FORM_RESET`,
        });

        expect(dispatch.mock.calls[5][0]).toEqual({
          type: `LOAD_COMMENTS_SUCCESSFUL`,
          payload: {"comments": comments},
        });
      });
  });

  it(`Should make a correct fail post comment`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const errorText = `All fields are required.`;
    apiMock
      .onPost(`/comments/1`)
      .reply(400, {error: errorText});

    return sendReview(1, `comment text`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: `COMMENT_SENDING`,
          payload: false,
        });

        expect(dispatch.mock.calls[3][0]).toEqual({
          type: `COMMENT_ERROR`,
          payload: errorText,
        });
      });
  });
});

describe(`Loading favorites api works correctly`, () => {
  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/favorite`)
      .reply(200, mockOffers);

    return loadFavorites()(dispatch, () => ({}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: `LOAD_FAVORITES_SUCCESSFUL`,
          payload: {"offers": offers}
        });
      });
  });

  it(`Should make a correct API call to change favotite state`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/favorite/${offers[0].id}/${offers[0].isFavorite ? `0` : `1`}`)
      .reply(200, mockOffers[0]);

    return changeFavorites(offers[0])(dispatch, () => ({}), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: `UPDATE_OFFER`,
          payload: offers[0]
        });
      });
  });
});
