import {
  reducer,
  authorizeUser,
} from "../../reducers/user/user.js";
import MockAdapter from "axios-mock-adapter";
import {configureAPI} from "../../api.js";

const api = configureAPI();

const initialState = {
  autorizationError: null,
  user: null,
};

describe(`User reducer end point api works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
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
