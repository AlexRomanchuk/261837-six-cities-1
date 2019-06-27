import React from "react";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Redirector = (props) => {
  const {offerId} = props;
  return <Redirect to={`/offer/${offerId}`} />;
};

Redirector.propTypes = {
  offerId: PropTypes.string.isRequired,
};

const mapStateToProps = ({}, ownProps) => Object.assign({}, ownProps, {
  offerId: ownProps.match.params.id
});

export {Redirector};

export default connect(mapStateToProps)(Redirector);
