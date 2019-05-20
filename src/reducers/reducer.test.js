import {reducer} from "../reducers/reducer.js";
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
  offers: initOffers
};

it(`correct change city`, () => {
  expect(reducer(initialState, {
    type: `CHANGE_CITY`,
    payload: initialState
  }).city).toEqual(`Amsterdam`);
});
