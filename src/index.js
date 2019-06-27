import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import Main from "./components/main/main.jsx";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducer from "./reducers/reducer.js";
import {loadData} from "./reducers/offers/offers.js";
import {loadAuthorizationData} from "./reducers/user/user.js";
import {configureAPI, setupAPIinterceptors} from "./api.js";

const api = configureAPI();

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);
/* eslint-enable */
store.dispatch(loadAuthorizationData());
store.dispatch(loadData(`/hotels`));
setupAPIinterceptors(api, store);

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
