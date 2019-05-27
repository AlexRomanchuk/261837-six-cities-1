import React, {PureComponent} from "react";

const sortParameters = [
  {
    name: `Popular`,
    action: null
  },
  {
    name: `Price: low to high`,
    action: (place1, place2) => place1.price - place2.price
  },
  {
    name: `Price: high to low`,
    action: (place1, place2) => place2.price - place1.price
  },
  {
    name: `Top rated first`,
    action: (place1, place2) => place2.rating - place1.rating
  }
];

const withPlacesSort = (Component) => {
  class WithPlacesSort extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeSorting: sortParameters[0],
      };
      this.handlerSortClick = this.handlerSortClick.bind(this);
    }
    render() {
      return <Component
        {...this.props}
        activeParameter={this.state.activeSorting}
        parameters={sortParameters}
        onSortClick={this.handlerSortClick}
      />;
    }
    handlerSortClick(activeSorting) {
      this.setState({activeSorting});
    }
  }
  return WithPlacesSort;
};

export default withPlacesSort;
