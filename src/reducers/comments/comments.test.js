import {
  reducer,
  loadComments,
  sendReview,
} from "../../reducers/comments/comments.js";
import MockAdapter from "axios-mock-adapter";
import {configureAPI} from "../../api.js";
import mockComments from "../../mocks/mock-comments.json";
import {parseComment} from "../../util/util.js";

const api = configureAPI();
const comments = mockComments.map(parseComment);

const initialState = {
  rating: 0,
  comment: ``,
  comments: [],
  isCommentsLoading: true,
  isCommentsLoaded: false,
  isCommentSending: false,
  isCommentSended: false,
  commentError: null,
};

describe(`Comments reducer end point api works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer save loaded comments to store`, () => {
    expect(reducer(undefined, {
      type: `LOAD_COMMENTS_SUCCESSFUL`,
      payload: {"comments": comments},
    }).comments).toEqual(comments);
  });

  it(`Reducer save loading error to store`, () => {
    const errorText = `some error`;
    expect(reducer(undefined, {
      type: `LOAD_COMMENTS_FAILURE`,
      payload: errorText,
    }).commentError).toEqual(errorText);
  });

  it(`Reducer set sending state`, () => {
    expect(reducer(undefined, {
      type: `COMMENT_SENDING`,
      payload: true,
    }).isCommentSending).toEqual(true);
  });

  it(`Reducer set sended state`, () => {
    expect(reducer(undefined, {
      type: `COMMENT_SENDED`,
    })).toEqual(expect.objectContaining({
      isCommentSending: false,
      commentError: null,
      isCommentSended: true,
    }));
  });

  it(`Reducer save sending error to store`, () => {
    const error = `some error`;
    expect(reducer(undefined, {
      type: `COMMENT_ERROR`,
      payload: error,
    })).toEqual(expect.objectContaining({
      isCommentSending: false,
      commentError: error,
      isCommentSended: false,
    }));
  });

  it(`Correct handle input rating`, () => {
    const rating = 4;
    expect(reducer(undefined, {
      type: `RATING_INPUT`,
      payload: rating,
    }).rating).toEqual(rating);
  });

  it(`Correct handle input comment`, () => {
    const comment = `some text`;
    expect(reducer(undefined, {
      type: `COMMENT_INPUT`,
      payload: comment,
    }).comment).toEqual(comment);
  });

  it(`Correct reset comment form`, () => {
    expect(reducer(undefined, {
      type: `FORM_RESET`,
    })).toEqual(expect.objectContaining({
      rating: 0,
      comment: ``
    }));
  });
});

describe(`Loading comments api works correctly`, () => {
  it(`Should make a correct load comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/comments/1`)
      .reply(200, mockComments);

    return loadComments(1)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: `LOAD_COMMENTS_SUCCESSFUL`,
          payload: {"comments": comments},
        });
      });
  });

  it(`Should make a correct fail load comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const errorText = `some error text`;
    apiMock
      .onGet(`/comments/1`)
      .reply(400, {error: errorText});

    return loadComments(1)(dispatch, jest.fn(), api)
      .then(() => {
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: `LOAD_COMMENTS_FAILURE`,
          payload: errorText,
        });
      });
  });

  it(`Should make a correct post comment`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/comments/1`)
      .reply(200, mockComments);

    return sendReview(1, `comment text`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(6);

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: `COMMENT_SENDING`,
          payload: false,
        });

        expect(dispatch.mock.calls[3][0]).toEqual({
          type: `COMMENT_SENDED`,
        });

        expect(dispatch.mock.calls[4][0]).toEqual({
          type: `FORM_RESET`,
        });

        expect(dispatch.mock.calls[5][0]).toEqual({
          type: `LOAD_COMMENTS_SUCCESSFUL`,
          payload: {"comments": comments},
        });
      });
  });

  it(`Should make a correct fail post comment`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const errorText = `All fields are required.`;
    apiMock
      .onPost(`/comments/1`)
      .reply(400, {error: errorText});

    return sendReview(1, `comment text`)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);

        expect(dispatch.mock.calls[2][0]).toEqual({
          type: `COMMENT_SENDING`,
          payload: false,
        });

        expect(dispatch.mock.calls[3][0]).toEqual({
          type: `COMMENT_ERROR`,
          payload: errorText,
        });
      });
  });
});
