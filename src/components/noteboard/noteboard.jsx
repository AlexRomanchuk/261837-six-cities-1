import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

export default class Noteboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null,
      getData: (data) => {
        this.state.activeCard = data;
      }
    };
  }
  render() {
    return <div className="cities__places-list places__list tabs__content">
      {this.props.data.map((item, i) => <Card
        key={i}
        src={item.src}
        type={item.type}
        price={item.price}
        rating={item.rating}
        title={item.title}
        onClick={(evt) => {
          evt.preventDefault();
          this.state.getData(item);
        }}
      />)
      }
    </div>;
  }
}

Noteboard.propTypes = {
  data: PropTypes.array.isRequired,
};
