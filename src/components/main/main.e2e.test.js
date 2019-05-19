import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "../main/main.jsx";

Enzyme.configure({adapter: new Adapter()});

const mockOffers = [
  {
    src: `img/apartment-01.jpg`,
    price: 120,
    type: `Apartment`,
    title: `Beautiful &amp; luxurious apartment at great location`,
    rating: 93,
    coords: [52.3909553943508, 4.85309666406198]
  }
];

const count = 1;

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

const currentCity = `Amsterdam`;

const cities = [`Amsterdam`, `Dusseldorf`, `Moscow`];

it(`correct click handler on card title`, () => {
  const clickHandler = jest.fn();
  const main = shallow(<Main
    offers={mockOffers}
    countOffers={count}
    coordsOffers={coords}
    cities={cities}
    currentCity={currentCity}
  />);

  const headerLink = main.find(`.place-card__name a`);
  headerLink.props.onClick = clickHandler;
  headerLink.props.onClick();

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
