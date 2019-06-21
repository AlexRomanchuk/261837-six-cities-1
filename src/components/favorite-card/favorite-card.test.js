import React from "react";
import renderer from "react-test-renderer";
import {FavoriteCard} from "../favorite-card/favorite-card.jsx";
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

it(`FavoriteCard snapshot`, () => {
  const tree = renderer.create(<StaticRouter>
    <FavoriteCard
      offer={mockPlaces[0]}
      onRemoveBookmarkClick={jest.fn()}
    /></StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
