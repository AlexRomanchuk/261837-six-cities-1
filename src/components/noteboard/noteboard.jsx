import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";

const Noteboard = (props) => {
  const {data, onClick, onMouseOver} = props;
  return <div className="cities__places-list places__list tabs__content">
    {data.map((item, i) => <Card
      key={i}
      src={item.src}
      type={item.type}
      price={item.price}
      rating={item.rating}
      title={item.title}
      onClick={(evt) => {
        evt.preventDefault();
        onClick(item);
      }}
      onMouseOver={() => {
        onMouseOver(item);
      }}
    />)
    }
  </div>;
};

Noteboard.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};

export default Noteboard;
