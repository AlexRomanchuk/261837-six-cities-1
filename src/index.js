import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main/main.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./reducers/reducer.js";

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <Main />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
