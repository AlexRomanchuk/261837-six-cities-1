import {reducer} from "../reducers/reducer.js";

const initialState = {
  city: `Amsterdam`,
  cityCoords: [52.38333, 4.9],
};

it(`correct change city`, () => {
  expect(reducer(initialState, {
    type: `CHANGE_CITY`,
    payload: `Moscow`
  })).toEqual({
    city: `Moscow`,
    cityCoords: [52.38333, 4.9],
  });
});
