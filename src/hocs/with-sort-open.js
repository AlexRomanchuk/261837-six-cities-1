import React, {PureComponent} from "react";

const withSortOpen = (Component) => {
  class WithSortOpen extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
      this.handlerOpenSortClick = this.handlerOpenSortClick.bind(this);
    }
    render() {
      return <Component
        {...this.props}
        isSortOpen={this.state.isOpen}
        onOpenSortClick={this.handlerOpenSortClick}
      />;
    }
    handlerOpenSortClick() {
      const isOpen = !this.state.isOpen;
      this.setState({isOpen});
    }
  }
  return WithSortOpen;
};

export default withSortOpen;
