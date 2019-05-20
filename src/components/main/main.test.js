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


const currentCity = `Amsterdam`;

const coords = [
  {
    coordinates: [52.3909553943508, 4.85309666406198]
  },
  {
    coordinates: [52.369553943508, 4.85309666406198]
  },
  {
    coordinates: [52.3909553943508, 4.929309666406198]
  },
  {
    coordinates: [52.3809553943508, 4.939309666406198]
  }
];

const cityCoords = {
  coordinates: [52.3809553943508, 4.939309666406198]
};

const onChange = () => {
  return true;
};

it(`correct renders main page`, () => {
  const tree = renderer
    .create(<Main
      listOffers={mockOffers}
      coordsOffers={coords}
      cities={cities}
      currentCity={currentCity}
      onChange={onChange}
      cityCoords={cityCoords}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
