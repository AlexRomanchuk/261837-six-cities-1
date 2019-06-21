import React from "react";
import renderer from "react-test-renderer";
import {Login} from "../login/login.jsx";
import {StaticRouter} from "react-router-dom";

it(`correct renders sign in page`, () => {
  const tree = renderer.create(<StaticRouter>
    <Login
      onSubmitForm={() => {}}
      onFieldInput={() => {}}
      user={{name: `name`}}
      formData={{email: `email`}}
    /></StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
