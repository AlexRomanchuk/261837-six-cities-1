import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Card} from "../card/card.jsx";
import {StaticRouter} from "react-router-dom";

Enzyme.configure({adapter: new Adapter()});

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

it(`correct click handler on one card title`, () => {
  let data = {};
  const card = mount(<StaticRouter><Card
    place={mockOffer}
    onClick={(evt) => {
      evt.preventDefault();
      data = mockOffer;
    }}
    onBookmarkClick={(evt) => {
      evt.preventDefault();
      data = mockOffer;
    }}
  /></StaticRouter>);

  const headerLink = card.find(`.place-card__image-wrapper a`);
  headerLink.simulate(`click`);

  expect(data).toEqual(mockOffer);
});
