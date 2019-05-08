import React from "react";
import renderer from "react-test-renderer";
import Noteboard from "../noteboard/noteboard.jsx";

const mockOffers = [
  {
    src: `img/apartment-01.jpg`,
    price: 120,
    type: `Apartment`,
    title: `Beautiful &amp; luxurious apartment at great location`,
    rating: 93
  },
  {
    src: `img/room.jpg`,
    price: 80,
    type: `Private room`,
    title: `Wood and stone place`,
    rating: 80
  },
  {
    src: `img/apartment-02.jpg`,
    price: 132,
    type: `Apartment`,
    title: `Canal View Prinsengracht`,
    rating: 80
  },
  {
    src: `img/apartment-03.jpg`,
    price: 180,
    type: `Hotel`,
    title: `Nice, cozy, warm big bed apartment`,
    rating: 100
  }
];

it(`correct renders noteboard page`, () => {
  const tree = renderer
    .create(<Noteboard
      data={mockOffers}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
