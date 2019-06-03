import axios from "axios";
import {ActionsCreator} from "./reducers/reducer.js";

const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });
  const onSuccess = (response) => {
    if (response.status === 200) {
      dispatch(ActionsCreator[`LOAD_DATA_SUCCESSFUL`](response.data));
    }
  };
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionsCreator[`LOAD_DATA_FAILURE`](err.response));
    }
    return err;
  };
  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

export default configureAPI;
