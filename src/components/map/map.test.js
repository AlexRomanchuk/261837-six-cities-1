import React from "react";
import renderer from "react-test-renderer";
import Map from "../map/map.jsx";

const mockOffers = [
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

it(`correct renders map page`, () => {
  const tree = renderer
    .create(<Map
      coords={mockOffers}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
