import React, {PureComponent} from 'react';
import leaflet from 'leaflet';
import PropTypes from "prop-types";

const markerIcon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39]
});

const activeMarkerIcon = leaflet.icon({
  iconUrl: `img/active-pin.svg`,
  iconSize: [27, 39]
});

class Map extends PureComponent {
  render() {
    return <div id="map" style={{height: `100%`}}>Не удалось показать карту</div>;
  }

  componentDidMount() {
    const {city, places} = this.props;
    setTimeout(() => {
      const zoom = 12;
      this.map = leaflet.map(`map`, {
        center: city.coordinates,
        [`zoom`]: zoom,
        zoomControl: false,
        marker: true
      });
      this.map.setView(city.coordinates, zoom);

      leaflet.tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
            contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
          }
      ).addTo(this.map);

      this.markersLayer = leaflet.layerGroup().addTo(this.map);
      for (const place of places) {
        leaflet.marker(place.coordinates, {icon: markerIcon}).addTo(this.markersLayer);
      }
    }, 10);
  }

  componentDidUpdate() {
    if (this.map && this.markersLayer) {
      const {city, places, activePlace} = this.props;
      const center = activePlace ? activePlace.coordinates : city.coordinates;
      this.map.panTo(center);

      this.markersLayer.clearLayers();
      for (const place of places) {
        const icon = (activePlace && activePlace.id === place.id) ?
          activeMarkerIcon : markerIcon;
        leaflet.marker(place.coordinates, {icon}).addTo(this.markersLayer);
      }
    }
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }
}

Map.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
  ).isRequired,
  city: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  activePlace: PropTypes.object
};

export default Map;
