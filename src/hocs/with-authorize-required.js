import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Login from "../components/login/login.jsx";

const withAuthorizeReqired = (Component) => {
  const WithAuthorizeReqired = (props) => {
    if (!props.user) {
      return <Login />;
    }
    return <Component {...props} />;
  };

  WithAuthorizeReqired.propTypes = {
    user: PropTypes.object,
  };

  const mapStateToProps = (state) => ({
    user: state[`USER`].user,
  });

  return connect(mapStateToProps)(WithAuthorizeReqired);
};

export default withAuthorizeReqired;
