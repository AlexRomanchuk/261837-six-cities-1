import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MainPage} from "../main-page/main-page.jsx";

Enzyme.configure({adapter: new Adapter()});

const mockPlaces = [
  {
    id: 999,
    isPremium: true,
    picture: `test-image1.jpg`,
    price: 111,
    rating: 22,
    title: `Test title 1`,
    description: `text`,
    bedrooms: 2,
    type: `apartment`,
    goods: [`one`, `two`, `tree`],
    images: [`url1`, `url2`, `url3`],
    previewImage: ``,
    maxAdults: 2,
    isFavorite: true,
    city: {
      name: `City name 1`,
      location: {
        latitude: 1,
        longitude: 2,
        zoom: 13
      }
    },
    location: {
      latitude: 1,
      longitude: 2,
      zoom: 13
    },
    host: {
      id: 1,
      name: `name`,
      isPro: true,
      avatarUrl: `url`
    }
  },
  {
    id: 222,
    isPremium: false,
    picture: `test-image2.jpg`,
    price: 222,
    rating: 100,
    title: `Test title 2`,
    description: `text`,
    goods: [`one`, `two`, `tree`],
    images: [`url1`, `url2`, `url3`],
    bedrooms: 3,
    maxAdults: 1,
    type: `house`,
    previewImage: ``,
    isFavorite: true,
    coordinates: [52.3909553943508, 4.85309666406198],
    city: {
      name: `City name 2`,
      location: {
        latitude: 1,
        longitude: 2,
        zoom: 13
      }
    },
    location: {
      latitude: 1,
      longitude: 2,
      zoom: 13
    },
    host: {
      id: 1,
      name: `name`,
      isPro: true,
      avatarUrl: `url`
    }
  },
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
  const mainPage = shallow(<MainPage
    listOffers={mockPlaces}
    cities={cities}
    currentCity={currentCity}
    onChange={fakeCallback}
    cityCoords={cityCoords}
    onSelect={fakeCallback}
    onSubmitForm={fakeCallback}
    load={() => {}}
  />);

  const headerLink = mainPage.find(`.place-card__name a`);
  headerLink.props.onClick = clickHandler;
  headerLink.props.onClick();

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
