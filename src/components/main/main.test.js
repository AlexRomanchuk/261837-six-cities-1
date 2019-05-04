import React from "react";
import renderer from "react-test-renderer";
import Main from "../main/main.jsx";

const names = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];

it(`correct renders main page`, () => {
  const tree = renderer
    .create(<Main
      names={names}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
