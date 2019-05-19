import React from "react";
import renderer from "react-test-renderer";
import Cities from "../cities/cities.jsx";

const mocCities = [`Amsterdam`, `Dusseldorf`, `Moscow`];

it(`correct renders main page`, () => {
  const tree = renderer
    .create(<Cities
      data={mocCities}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
