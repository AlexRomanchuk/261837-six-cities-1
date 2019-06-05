import {reducer, loadData, authorizeUser} from "../reducers/reducer.js";
import MockAdapter from "axios-mock-adapter";
import configureAPI from "../api.js";
const dispatch = jest.fn();
const api = configureAPI();
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
  city: `Amsterdam`,
  coords: [52.38333, 4.9],
  listOffers: initOffers,
  currentCity: null,
  user: null,
  isAuthorizationRequired: false,
};

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

it(`correct check authorization`, () => {
  expect(reducer(initialState, {
    type: `REQUIRE_AUTH`,
    payload: false
  }).isAuthorizationRequired).toEqual(false);
});

it(`correct select offer`, () => {
  expect(reducer(initialState, {
    type: `SELECT_CARD`,
    payload: {
      city: `Amsterdam`
    }
  }).currentCity).toEqual(null);
});

it(`correct load data`, () => {
  const apiMock = new MockAdapter(api);

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

it(`correct authorization`, () => {
  const apiMock = new MockAdapter(api);

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
