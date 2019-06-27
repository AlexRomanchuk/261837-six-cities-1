import {parseAuthorizationData} from "../../util/util.js";
import {loadData} from "../offers/offers.js";

export const initialState = {
  autorizationError: null,
  user: null,
};

// блок действий

export const ActionsCreator = {
  "REGISTER": (data) => {
    return {
      type: `REGISTER`,
      payload: data,
    };
  },
  "HANDLE_ERROR_AUTORIZE": (err) => {
    return {
      type: `HANDLE_ERROR_AUTORIZE`,
      payload: err,
    };
  },
};

// блок подключений

export const authorizeUser = (email, password) => (dispatch, _getState, api) => {
  return api.post(`/login`, {email, password})
    .then((response) => {
      const user = parseAuthorizationData(response.data);
      dispatch(ActionsCreator[`REGISTER`](user));
    })
    .catch((error) => {
      dispatch(ActionsCreator[`HANDLE_ERROR_AUTORIZE`](error.response));
    });
};

export const loadAuthorizationData = () => (dispatch, _getState, api) => {
  return api.get(`/login`)
    .then((response) => {
      const user = parseAuthorizationData(response.data);
      dispatch(ActionsCreator[`REGISTER`](user));
    })
    .catch(() => {
      dispatch(ActionsCreator[`REGISTER`](null));
    });
};

export const unauthorizeUser = () => (dispatch, _getState, api) => {
  return api.get(`/logout`)
    .finally(() => {
      dispatch(ActionsCreator[`REGISTER`](null));
      dispatch(loadData(`/hotels`));
    });
};

// блок управления

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `HANDLE_ERROR_AUTORIZE`: return Object.assign({}, state, {
      autorizationError: action.payload,
    });
    case `REGISTER`: return Object.assign({}, state, {
      user: action.payload,
    });
    default: return state;
  }
};
