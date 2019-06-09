import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import Main from "./components/main/main.jsx";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {reducer, loadData} from "./reducers/reducer.js";
import configureAPI from "./api.js";
const api = configureAPI();

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);
/* eslint-enable */
store.dispatch(loadData(`/hotels`));

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
