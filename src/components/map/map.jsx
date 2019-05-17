import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

export default class Map extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return <div id="map" style={{height: `100%`}}>Не удалось показать карту</div>;
  }
  componentDidMount() {
    try {
      const city = [52.38333, 4.9];

      const icon = leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [27, 39]
      });

      const zoomCity = 12;

      const map = leaflet.map(`map`, {
        center: city,
        zoom: zoomCity,
        zoomControl: false,
        marker: true
      });
      map.setView(city, zoomCity);

      leaflet
        .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })
        .addTo(map);

      this.props.coords.forEach((coords) => {
        leaflet
          .marker(coords, {icon})
          .addTo(map);
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}

Map.propTypes = {
  coords: PropTypes.array.isRequired,
};
