import {
  reducer,
  changeFavorites,
  loadFavorites,
} from "../../reducers/favorites/favorites.js";
import MockAdapter from "axios-mock-adapter";
import {configureAPI} from "../../api.js";
import mockOffers from "../../mocks/mock-offers.json";
import {parseOffer} from "../../util/util.js";

const api = configureAPI();
const offers = mockOffers.map(parseOffer);

const initialState = {
  favoritePlaces: [],
  isFavoritesLoading: true,
  isFavoritesLoaded: false,
  favoritesError: null,
};

describe(`Favorites reducer end point api works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
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
    }).favoritesError).toEqual(errorText);
  });

  it(`Reducer remove offer from favorites`, () => {
    expect(reducer({favoritePlaces: [...offers]}, {
      type: `REMOVE_FAVORITE`,
      payload: offers[0],
    }).favoritePlaces).toEqual(offers.filter((it) => it.id !== offers[0].id));
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
