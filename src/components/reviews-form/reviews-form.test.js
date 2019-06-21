import React from "react";
import renderer from "react-test-renderer";
import {ReviewsForm} from "../reviews-form/reviews-form.jsx";

it(`ReviewForm snapshot`, () => {
  const tree = renderer.create(<ReviewsForm
    onTextChange={jest.fn}
    onRatingSelect={jest.fn}
    formReset={jest.fn}
    onSend={jest.fn()}
    offerId={0}
    formData={{}}
    invalid={false}
    sending={false}
    sended={false}
    sendingError={``}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
