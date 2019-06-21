import React from "react";
import renderer from "react-test-renderer";
import Loading from "../loading/loading.jsx";

it(`Loading page snapshot`, () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});
