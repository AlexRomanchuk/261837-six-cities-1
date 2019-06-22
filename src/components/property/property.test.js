import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import {Property} from "../property/property.jsx";
import {StaticRouter} from "react-router-dom";

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

it(`Property snapshot`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<StaticRouter><Property
    user={{name: `name`}}
    isAuthorizeRequired={false}
    onBookmarksClick={jest.fn}
    nearOffers={[mockPlaces[1], mockPlaces[1], mockPlaces[1]]}
    offer={mockPlaces[0]}
  /></StaticRouter>);
  expect(tree).toMatchSnapshot();
});
