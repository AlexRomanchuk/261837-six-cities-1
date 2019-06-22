import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Noteboard from "../noteboard/noteboard.jsx";

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

const sortParameters = [
  {
    name: `Popular`,
    action: null
  },
  {
    name: `Price: low to high`,
    action: (place1, place2) => place1.price - place2.price
  },
  {
    name: `Price: high to low`,
    action: (place1, place2) => place2.price - place1.price
  },
  {
    name: `Top rated first`,
    action: (place1, place2) => place2.rating - place1.rating
  }
];

const onClick = () => {
  return true;
};

it(`correct renders noteboard page`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<Noteboard
    city={`Amsterdam`}
    cityCoords={{location: {
      coords: [52.3809553943508, 4.939309666406198],
    }}}
    isSortOpen={false}
    activeParameter={sortParameters[0]}
    parameters={sortParameters}
    places={mockPlaces}
    activePlace={mockPlaces[1]}
    onClick={onClick}
    onSortClick={onClick}
    onOpenSortClick={onClick}
    onSelect={() => {}}
  />);
  expect(tree).toMatchSnapshot();
});
