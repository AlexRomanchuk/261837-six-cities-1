import axios from "axios";
import history from "./util/util.js";
import {ActionsCreator} from "./reducers/reducer.js";

const BASE_URL = `https://es31-server.appspot.com/six-cities`;
const ACCESS_DENIED_CODE = 403;

const configureAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });
  return api;
};

const onLoginFail = (response, store) => {
  if (response && response.config.url !== `${BASE_URL}/login`) {
    store.dispatch(ActionsCreator[`REGISTER`](null));
    history.push(`/login`);
  }
};

const setupAPIinterceptors = (api, store) => {
  const onFail = (error) => {
    if (error.response && error.response.status === ACCESS_DENIED_CODE) {
      onLoginFail(error.response, store);
    }
    return Promise.reject(error);
  };

  api.interceptors.response.use(undefined, onFail);
};

export {configureAPI, setupAPIinterceptors};
