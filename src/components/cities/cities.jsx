import React from "react";
import PropTypes from "prop-types";

const Cities = (props) => {
  const {data} = props;
  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {data.map((city, i) => <li className="locations__item" key={i}>
        <a className="locations__item-link tabs__item" href="#">
          <span>{city}</span>
        </a>
      </li>)}
    </ul>
  </section>
};

Cities.propTypes = {
  data: PropTypes.array.isRequired
};

export default Cities;
