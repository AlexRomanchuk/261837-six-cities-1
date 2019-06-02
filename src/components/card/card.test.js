import React from "react";
import renderer from "react-test-renderer";
import Card from "../card/card.jsx";

const mockOffer = {
  id: 1,
  price: 120,
  type: `apartment`,
  title: `Beautiful &amp; luxurious apartment at great location`,
  rating: 93,
};

it(`correct renders card page`, () => {
  const tree = renderer
    .create(<Card
      place={mockOffer}
      onClick={(evt) => {
        evt.preventDefault();
      }}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
