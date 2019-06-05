import React from "react";
import renderer from "react-test-renderer";
import Login from "../login/login.jsx";

it(`correct renders sign in page`, () => {
  const tree = renderer
    .create(<Login onSubmitForm={() => {}} onEmailInput={() => {}} onPasswordInput={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
