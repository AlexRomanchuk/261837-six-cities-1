import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import Main from "./components/main/main.jsx";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {reducer} from "./reducers/reducer.js";
import configureAPI from "./api.js";
const api = configureAPI((...args) => store.dispatch(...args));

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);
/* eslint-enable */
api.get(`/hotels`);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <Main />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
