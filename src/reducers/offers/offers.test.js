import {
  reducer,
  loadData
} from "../../reducers/offers/offers.js";
import MockAdapter from "axios-mock-adapter";
import {configureAPI} from "../../api.js";
import mockOffers from "../../mocks/mock-offers.json";
import {parseOffer} from "../../util/util.js";

const api = configureAPI();
const offers = mockOffers.map(parseOffer);

const initialState = {
  listOffers: [],
  filteredPlaces: [],
  city: null,
  activeCard: null,
  isLoading: true,
  isLoadingFailed: false,
  isLoaded: false,
  error: null,
};

describe(`Reducer end point api works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
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

