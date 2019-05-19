import React from "react";
import renderer from "react-test-renderer";
import Cities from "../cities/cities.jsx";

const mocCities = [`Amsterdam`, `Dusseldorf`, `Moscow`];
const currentCity = `Amsterdam`;

it(`correct renders main page`, () => {
  const tree = renderer
    .create(<Cities
      data={mocCities}
      currentCity={currentCity}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
