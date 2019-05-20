import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main/main.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./reducers/reducer.js";

const store = createStore(reducer);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <Main />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
