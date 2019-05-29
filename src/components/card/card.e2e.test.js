import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "../card/card.jsx";

Enzyme.configure({adapter: new Adapter()});

const mockOffer = {
  id: 1,
  isPremium: false,
  src: `img/apartment-01.jpg`,
  price: 120,
  type: `Apartment`,
  title: `Beautiful &amp; luxurious apartment at great location`,
  rating: 93
};

it(`correct click handler on one card title`, () => {
  let data = {};
  const card = mount(<Card
    place={mockOffer}
    onClick={(evt) => {
      evt.preventDefault();
      data = mockOffer;
    }}
  />);

  const headerLink = card.find(`.place-card__image-wrapper a`);
  headerLink.simulate(`click`);

  expect(data).toEqual(mockOffer);
});
