import React from "react";
import renderer from "react-test-renderer";
import {Redirector} from "../redirector/redirector.jsx";
import {StaticRouter} from "react-router-dom";

it(`correct renders redirector component`, () => {
  const tree = renderer.create(<StaticRouter>
    <Redirector
      offerId={`2`}
    /></StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
