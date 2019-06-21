import React from "react";
import renderer from "react-test-renderer";
import {Card} from "../card/card.jsx";
import {StaticRouter} from "react-router-dom";

const mockOffer = {
  id: 1,
  price: 120,
  type: `apartment`,
  title: `Beautiful &amp; luxurious apartment at great location`,
  rating: 93,
  isFavorite: false,
  previewImage: `url`,
  isPremium: true,
};

it(`correct renders card page`, () => {
  const tree = renderer
    .create(<StaticRouter>
      <Card
        place={mockOffer}
        onClick={(evt) => {
          evt.preventDefault();
        }}
        onBookmarkClick={(evt) => {
          evt.preventDefault();
        }}
      />
    </StaticRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
