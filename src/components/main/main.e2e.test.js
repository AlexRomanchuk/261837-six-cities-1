import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "../main/main.jsx";

Enzyme.configure({adapter: new Adapter()});

const mockOffers = [
  {
    id: 1,
    isPremium: true,
    src: `img/apartment-01.jpg`,
    price: 120,
    type: `apartment`,
    title: `Beautiful &amp; luxurious apartment at great location`,
    rating: 93,
    coordinates: [52.3909553943508, 4.85309666406198],
    city: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9]
    }
  },
  {
    id: 2,
    isPremium: true,
    src: `img/room.jpg`,
    price: 80,
    type: `room`,
    title: `Wood and stone place`,
    rating: 80,
    coordinates: [52.369553943508, 4.85309666406198],
    city: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9]
    }
  },
  {
    id: 3,
    isPremium: false,
    src: `img/apartment-02.jpg`,
    price: 132,
    type: `apartment`,
    title: `Canal View Prinsengracht`,
    rating: 80,
    coordinates: [52.3909553943508, 4.929309666406198],
    city: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9]
    }
  },
  {
    id: 4,
    isPremium: false,
    src: `img/apartment-03.jpg`,
    price: 180,
    type: `hotel`,
    title: `Nice, cozy, warm big bed apartment`,
    rating: 100,
    coordinates: [52.3809553943508, 4.939309666406198],
    city: {
      name: `Amsterdam`,
      coords: [52.38333, 4.9]
    }
  }
];

const cities = [`Amsterdam`, `Dusseldorf`, `Moscow`];


const currentCity = `Amsterdam`;

const cityCoords = {
  coordinates: [52.3809553943508, 4.939309666406198]
};

const fakeCallback = () => {
  return true;
};

it(`correct click handler on card title`, () => {
  const clickHandler = jest.fn();
  const main = shallow(<Main
    listOffers={mockOffers}
    cities={cities}
    currentCity={currentCity}
    cityCoords={cityCoords}
    onChange={fakeCallback}
    onSelect={fakeCallback}
    onSubmitForm={fakeCallback}
    onProfileClick={fakeCallback}
  />);

  const headerLink = main.find(`.place-card__name a`);
  headerLink.props.onClick = clickHandler;
  headerLink.props.onClick();

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
