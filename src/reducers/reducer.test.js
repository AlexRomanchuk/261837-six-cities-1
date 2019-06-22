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

const initialState = {
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

describe(`Reducer end point api works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer save loaded comments to store`, () => {
    expect(reducer(undefined, {
      type: `LOAD_COMMENTS_SUCCESSFUL`,
      payload: {"comments": comments},
    }).comments).toEqual(comments);
  });

  it(`Reducer correctly change city`, () => {
    const currentCity = `Amsterdam`;
    expect(reducer(undefined, {
      type: `CHANGE_CITY`,
      payload: {city: currentCity},
    }).city).toEqual(currentCity);
  });

  it(`Reducer correctly change city`, () => {
    const mockData = offers[0];
    expect(reducer(undefined, {
      type: `SELECT_CARD`,
      payload: mockData,
    }).activeCard).toEqual(mockData);
  });

  it(`Reducer save loading error to store`, () => {
    const errorText = `some error`;
    expect(reducer(undefined, {
      type: `LOAD_COMMENTS_FAILURE`,
      payload: errorText,
    }).error).toEqual(errorText);
  });

  it(`Reducer set sending state`, () => {
    expect(reducer(undefined, {
      type: `COMMENT_SENDING`,
      payload: true,
    }).isCommentSending).toEqual(true);
  });

  it(`Reducer set sended state`, () => {
    expect(reducer(undefined, {
      type: `COMMENT_SENDED`,
    })).toEqual(expect.objectContaining({
      isCommentSending: false,
      error: null,
      isCommentSended: true,
    }));
  });

  it(`Reducer save sending error to store`, () => {
    const error = `some error`;
    expect(reducer(undefined, {
      type: `COMMENT_ERROR`,
      payload: error,
    })).toEqual(expect.objectContaining({
      isCommentSending: false,
      commentError: error,
      isCommentSended: false,
    }));
  });

  it(`Reducer should save authorazation state to store`, () => {
    expect(reducer(undefined, {
      type: `REGISTER`,
      payload: {name: `user`},
    }).user).toEqual({name: `user`});
  });

  it(`Reducer should save authorazation error to store`, () => {
    const authorizationError = {error: `error text`};
    expect(reducer(undefined, {
      type: `HANDLE_ERROR_AUTORIZE`,
      payload: authorizationError,
    }).autorizationError).toEqual(authorizationError);
  });

  it(`Reducer should set offers loading state`, () => {
    expect(reducer(undefined, {
      type: `LOAD_DATA_SUCCESSFUL`,
      payload: offers,
    })).toEqual(expect.objectContaining({
      isLoadingFailed: false,
      isLoading: false,
    }));
  });

  it(`Reducer should save loading data error to store`, () => {
    const mockError = `some error text`;
    expect(reducer(undefined, {
      type: `LOAD_DATA_FAILURE`,
      payload: mockError,
    }).error).toEqual(mockError);
  });

  it(`Reducer should update offer in store`, () => {
    const newOffer = Object.assign({}, offers[0], {title: `Edited title`});
    expect(reducer({listOffers: [...offers]}, {
      type: `UPDATE_OFFER`,
      payload: newOffer,
    }).listOffers[0]).toEqual(newOffer);
  });

  it(`Reducer save favorites to store`, () => {
    expect(reducer(undefined, {
      type: `LOAD_FAVORITES_SUCCESSFUL`,
      payload: {"offers": offers},
    }).favoritePlaces).toEqual(offers);
  });

  it(`Reducer save loading error favorites to store`, () => {
    const errorText = `some error`;
    expect(reducer(undefined, {
      type: `LOAD_FAVORITES_FAILURE`,
      payload: errorText,
    }).error).toEqual(errorText);
  });

  it(`Reducer remove offer from favorites`, () => {
    expect(reducer({favoritePlaces: [...offers]}, {
      type: `REMOVE_FAVORITE`,
      payload: offers[0],
    }).favoritePlaces).toEqual(offers.filter((it) => it.id !== offers[0].id));
  });

  it(`Correct handle input rating`, () => {
    const rating = 4;
    expect(reducer(undefined, {
      type: `RATING_INPUT`,
      payload: rating,
    }).rating).toEqual(rating);
  });

  it(`Correct handle input comment`, () => {
    const comment = `some text`;
    expect(reducer(undefined, {
      type: `COMMENT_INPUT`,
      payload: comment,
    }).comment).toEqual(comment);
  });

  it(`Correct reset comment form`, () => {
    expect(reducer(undefined, {
      type: `FORM_RESET`,
    })).toEqual(expect.objectContaining({
      rating: 0,
      comment: ``
    }));
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
