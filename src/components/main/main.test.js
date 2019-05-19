import React from "react";
import renderer from "react-test-renderer";
import {Main} from "../main/main.jsx";

const mockOffers = [
  {
    src: `img/apartment-01.jpg`,
    price: 120,
    type: `Apartment`,
    title: `Beautiful &amp; luxurious apartment at great location`,
    rating: 93,
    coords: [52.3909553943508, 4.85309666406198]
  },
  {
    src: `img/room.jpg`,
    price: 80,
    type: `Private room`,
    title: `Wood and stone place`,
    rating: 80,
    coords: [52.369553943508, 4.85309666406198]
  },
  {
    src: `img/apartment-02.jpg`,
    price: 132,
    type: `Apartment`,
    title: `Canal View Prinsengracht`,
    rating: 80,
    coords: [52.3909553943508, 4.929309666406198]
  },
  {
    src: `img/apartment-03.jpg`,
    price: 180,
    type: `Hotel`,
    title: `Nice, cozy, warm big bed apartment`,
    rating: 100,
    coords: [52.3809553943508, 4.939309666406198]
  }
];

const cities = [`Amsterdam`, `Dusseldorf`, `Moscow`];

const count = 4;

const coords = [
  {
    coords: [52.3909553943508, 4.85309666406198]
  },
  {
    coords: [52.369553943508, 4.85309666406198]
  },
  {
    coords: [52.3909553943508, 4.929309666406198]
  },
  {
    coords: [52.3809553943508, 4.939309666406198]
  }
];

it(`correct renders main page`, () => {
  const tree = renderer
    .create(<Main
      offers={mockOffers}
      countOffers={count}
      coordsOffers={coords}
      cities={cities}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
