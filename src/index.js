import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main/main.jsx";

const names = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];

const init = () => {
  ReactDOM.render(
      <Main
        names={names}
      />,
      document.querySelector(`#root`)
  );
};

init();
