import React from "react";
import renderer from "react-test-renderer";
import {Reviews} from "../reviews/reviews.jsx";

const loadedComments = [
  {
    id: 0,
    user: {
      id: 0,
      isPro: true,
      name: `name`,
      avatarUrl: `url`
    },
    rating: 4,
    comment: `some text`,
    date: `2019-05-14T06:07:35.291Z`
  },
  {
    id: 1,
    user: {
      id: 0,
      isPro: true,
      name: `name 2`,
      avatarUrl: `url 2`
    },
    rating: 4,
    comment: `some text 2`,
    date: `2018-05-14T06:07:35.291Z`
  },
];

it(`Reviews snapshot`, () => {
  const tree = renderer.create(<Reviews
    load={jest.fn}
    offerId={1}
    reviews={loadedComments}
    isLoaded={false}
    isLoading={false}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
