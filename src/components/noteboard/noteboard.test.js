import React from "react";
import renderer from "react-test-renderer";
import Noteboard from "../noteboard/noteboard.jsx";

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
  const tree = renderer
    .create(<Noteboard
      city={`Amsterdam`}
      cityCoords={{coordinates: {
        coords: [52.3809553943508, 4.939309666406198],
      }}}
      isSortOpen={false}
      activeParameter={sortParameters[0]}
      parameters={sortParameters}
      places={mockOffers}
      activePlace={mockOffers[1]}
      onClick={onClick}
      onSortClick={onClick}
      onOpenSortClick={onClick}
      onSelect={() => {}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
