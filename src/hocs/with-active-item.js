import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WrappedNoteboard extends PureComponent {
    constructor(props) {
      super(props);
    }
    render() {
      return <Component
        {...this.props}
        onClick={(data) => {
          this.props.onSelect(data);
        }}
      />;
    }
  }
  WrappedNoteboard.propTypes = {
    onSelect: PropTypes.func,
  };
  return WrappedNoteboard;
};

export default withActiveItem;
