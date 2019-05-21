import React from "react";
import renderer from "react-test-renderer";
import Cities from "../cities/cities.jsx";

const mocCities = [`Amsterdam`, `Dusseldorf`, `Moscow`];
const currentCity = `Amsterdam`;
const onChange = () => {
  return true;
};

it(`correct renders main page`, () => {
  const tree = renderer
    .create(<Cities
      data={mocCities}
      currentCity={currentCity}
      onChange={onChange}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
