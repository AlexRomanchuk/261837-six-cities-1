import React from "react";
import renderer from "react-test-renderer";
import Card from "../card/card.jsx";

const mockOffer = {
  src: `img/apartment-01.jpg`,
  price: 120,
  type: `Apartment`,
  title: `Beautiful &amp; luxurious apartment at great location`,
  rating: 93
};

it(`correct renders card page`, () => {
  const tree = renderer
    .create(<Card
      src={mockOffer.src}
      type={mockOffer.type}
      price={mockOffer.price}
      rating={mockOffer.rating}
      title={mockOffer.title}
      onClick={(evt) => {
        evt.preventDefault();
      }}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
