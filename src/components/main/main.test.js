import React from "react";
import {Main} from "../main/main.jsx";
import {StaticRouter} from "react-router-dom";
import ShallowRenderer from "react-test-renderer/shallow";

const fakeCallback = () => {
  return true;
};

it(`correct renders main-controller page`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
    .render(<StaticRouter>
      <Main
        user={{name: `title`}}
        onLogoutClick={fakeCallback}
        isLoading={false}
      />
    </StaticRouter>);
  expect(tree).toMatchSnapshot();
});
