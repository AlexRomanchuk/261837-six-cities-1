import React from "react";
import renderer from "react-test-renderer";
import Card from "../card/card.jsx";

const mockOffer = {
  id: 1,
  isPremium: false,
  src: `img/apartment-01.jpg`,
  price: 120,
  type: `Apartment`,
  title: `Beautiful &amp; luxurious apartment at great location`,
  rating: 93
};

it(`correct renders card page`, () => {
  const tree = renderer
    .create(<Card
      place={mockOffer}
      onClick={(evt) => {
        evt.preventDefault();
      }}
      onMouseOver={(evt) => {
        evt.preventDefault();
      }}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
