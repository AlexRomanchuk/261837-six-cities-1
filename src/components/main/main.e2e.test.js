import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "../main/main.jsx";

Enzyme.configure({adapter: new Adapter()});

const names = [`Beautiful & luxurious apartment at great location`];

it(`correct click handler on card title`, () => {
  const clickHandler = jest.fn();
  const main = shallow(<Main
    names={names}
  />);

  const headerLink = main.find(`.place-card__name a`);
  headerLink.props.onClick = clickHandler;
  headerLink.props.onClick();

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
