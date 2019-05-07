import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main/main.jsx";
import {offers} from "./mocks/offers.js";

const init = () => {
  ReactDOM.render(
      <Main
        offers={offers}
      />,
      document.querySelector(`#root`)
  );
};

init();
