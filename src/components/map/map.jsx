import React, {PureComponent} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";

const markerIcon = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [27, 39]
});

const activeMarkerIcon = leaflet.icon({
  iconUrl: `/img/active-pin.svg`,
  iconSize: [27, 39]
});

class Map extends PureComponent {
  render() {
    return <div id="map" className="full-height" style={{width: `100%`, height: `100%`}}>Не удалось показать карту</div>;
  }

  componentDidMount() {
    const {city, places} = this.props;
    setTimeout(() => {
      const zoom = city.location.zoom;
      this.map = leaflet.map(`map`, {
        center: [city.location.latitude, city.location.longitude],
        [`zoom`]: zoom,
        zoomControl: false,
        marker: true
      });
      this.map.setView([city.location.latitude, city.location.longitude], zoom);

      leaflet.tileLayer(
          `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
          {
            attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
            contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
          }
      ).addTo(this.map);

      this.markersLayer = leaflet.layerGroup().addTo(this.map);
      for (const place of places) {
        leaflet.marker([place.location.latitude, place.location.longitude], {icon: markerIcon}).addTo(this.markersLayer);
      }
    }, 50);
  }

  componentDidUpdate() {
    if (this.map && this.markersLayer) {
      const {city, places, activePlace} = this.props;
      const center = activePlace ? [activePlace.location.latitude, activePlace.location.longitude] : [city.location.latitude, city.location.longitude];
      const zoom = activePlace ? activePlace.location.zoom : city.location.zoom;
      this.map.panTo(center);
      this.map.setView(center, zoom);
      this.markersLayer.clearLayers();
      for (const place of places) {
        const icon = (activePlace && activePlace.id === place.id) ?
          activeMarkerIcon : markerIcon;
        leaflet.marker([place.location.latitude, place.location.longitude], {icon}).addTo(this.markersLayer);
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
        location: PropTypes.object.isRequired,
      })
  ).isRequired,
  city: PropTypes.shape({
    location: PropTypes.object.isRequired,
  }),
  activePlace: PropTypes.object
};

export default Map;
