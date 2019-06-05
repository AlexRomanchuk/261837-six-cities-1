import React from "react";
import renderer from "react-test-renderer";
import {Main} from "../main/main.jsx";

const mockOffers = [
  {
    id: 1,
    isPremium: true,
    src: `img/apartment-01.jpg`,
    price: 120,
    type: `apartment`,
    title: `Beautiful &amp; luxurious apartment at great location`,
    rating: 93,
    location: {
      coords: [52.3909553943508, 4.85309666406198],
    },
    city: {
      name: `Amsterdam`,
      coords: {
        coords: [52.38333, 4.9]
      }
    }
  }
];

const cities = [`Amsterdam`, `Dusseldorf`, `Moscow`];


const currentCity = `Amsterdam`;

const cityCoords = {
  coordinates: {
    coords: [52.3809553943508, 4.939309666406198],
  }
};

const fakeCallback = () => {
  return true;
};

it(`correct renders main page`, () => {
  const tree = renderer
    .create(<Main
      listOffers={mockOffers}
      cities={cities}
      currentCity={currentCity}
      onChange={fakeCallback}
      cityCoords={cityCoords}
      onSelect={fakeCallback}
      onSubmitForm={fakeCallback}
      onProfileClick={fakeCallback}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
