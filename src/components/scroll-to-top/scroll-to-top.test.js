import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ScrollToTop from '../scroll-to-top/scroll-to-top.jsx';

it(`ScrollToTop snapshot`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer.render(<ScrollToTop />);
  expect(tree).toMatchSnapshot();
});
