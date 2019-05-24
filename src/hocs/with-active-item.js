import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WrappedNoteboard extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeCard: null,
      };
    }
    getData(data) {
      this.setState({activeCard: data});
    }
    render() {
      return <Component
        {...this.props}
        onClick={(data) => {
          this.getData(data);
        }}
        onMouseOver={(data) => {
          this.getData(data);
        }}
      />;
    }
  }
  return WrappedNoteboard;
};

export default withActiveItem;
