import {parseComment} from "../../util/util.js";

const BAD_DATA_CODE = 400;

export const initialState = {
  rating: 0,
  comment: ``,
  comments: [],
  isCommentsLoading: true,
  isCommentsLoaded: false,
  isCommentSending: false,
  isCommentSended: false,
  commentError: null,
};

// блок действий

export const ActionsCreator = {
  "LOAD_COMMENTS_SUCCESSFUL": (data) => {
    return {
      type: `LOAD_COMMENTS_SUCCESSFUL`,
      payload: {
        comments: data,
      }
    };
  },
  "LOAD_COMMENTS_FAILURE": (err) => {
    return {
      type: `LOAD_COMMENTS_FAILURE`,
      payload: err,
    };
  },
  "COMMENT_SENDING": (isSending) => {
    return {
      type: `COMMENT_SENDING`,
      payload: isSending,
    };
  },
  "COMMENT_ERROR": (error) => {
    return {
      type: `COMMENT_ERROR`,
      payload: error,
    };
  },
  "COMMENT_SENDED": () => {
    return {
      type: `COMMENT_SENDED`,
    };
  },
  "RATING_INPUT": (rating) => {
    return {
      type: `RATING_INPUT`,
      payload: rating,
    };
  },
  "COMMENT_INPUT": (comment) => {
    return {
      type: `COMMENT_INPUT`,
      payload: comment,
    };
  },
  "FORM_RESET": () => {
    return {
      type: `FORM_RESET`,
    };
  },
};

// блок подключений

export const sendReview = (placeId, comment) => (dispatch, _getState, api) => {
  dispatch(ActionsCreator[`COMMENT_ERROR`](null));
  dispatch(ActionsCreator[`COMMENT_SENDING`](true));
  return api.post(`/comments/${placeId}`, comment)
    .then((response) => {
      dispatch(ActionsCreator[`COMMENT_SENDING`](false));
      dispatch(ActionsCreator[`COMMENT_SENDED`]());
      dispatch(ActionsCreator[`FORM_RESET`]());
      const comments = response.data.map((it) => parseComment(it));
      dispatch(ActionsCreator[`LOAD_COMMENTS_SUCCESSFUL`](comments));
    })
    .catch((error) => {
      dispatch(ActionsCreator[`COMMENT_SENDING`](false));
      let errorString = `Send review error!`;
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.status === BAD_DATA_CODE) {
          errorString = `All fields are required.`;
        }
      }
      dispatch(ActionsCreator[`COMMENT_ERROR`](errorString));
    });
};

export const loadComments = (offerId) => (dispatch, _getState, api) => {
  return api.get(`/comments/${offerId}`)
    .then((response) => {
      const comments = response.data.map((it) => parseComment(it));
      dispatch(ActionsCreator[`LOAD_COMMENTS_SUCCESSFUL`](comments));
    })
    .catch((error) => {
      dispatch(ActionsCreator[`LOAD_COMMENTS_FAILURE`](error));
    });
};

// блок управления

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_COMMENTS_SUCCESSFUL`: return Object.assign({}, state, {
      comments: action.payload.comments,
      isCommentsLoading: false,
      isCommentsLoaded: true,
    });
    case `LOAD_COMMENTS_FAILURE`: return Object.assign({}, state, {
      isCommentsLoading: false,
      isCommentsLoaded: false,
      commentError: action.payload,
    });
    case `COMMENT_ERROR`: return Object.assign({}, state, {
      commentError: action.payload,
    });
    case `COMMENT_SENDING`: return Object.assign({}, state, {
      isCommentSending: action.payload,
    });
    case `COMMENT_SENDED`: return Object.assign({}, state, {
      isCommentSended: true,
    });
    case `COMMENT_INPUT`: return Object.assign({}, state, {
      comment: action.payload,
    });
    case `RATING_INPUT`: return Object.assign({}, state, {
      rating: action.payload,
    });
    case `FORM_RESET`: return Object.assign({}, state, {
      rating: 0,
      comment: ``,
    });
    default: return state;
  }
};
