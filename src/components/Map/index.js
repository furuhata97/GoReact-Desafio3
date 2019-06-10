import React, { Component } from "react";

import MapGL, { Marker } from "react-map-gl";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ModalActions } from "../../store/ducks/modal";

import "mapbox-gl/dist/mapbox-gl.css";

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.40754,
      longitude: -51.939151,
      zoom: 14
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  handleMapClick = async e => {
    const [longitude, latitude] = e.lngLat;

    this.props.users.data.map(user => console.log(user.cordinates));

    await this.props.mostrar({ latitude, longitude });
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken={
          "pk.eyJ1IjoiZnVydWhhdGFndXN0YXZvIiwiYSI6ImNqd3BpdXJhNTB4dGUzeW84ODR0MG4wajcifQ.opMCZyE_alen60KcR0B0YQ"
        }
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {this.props.users.data.map(user => (
          <Marker
            latitude={user.cordinates.latitude}
            longitude={user.cordinates.longitude}
            key={user.id}
          >
            <img
              style={{
                borderRadius: 100,
                width: 48,
                height: 48
              }}
              src={user.avatar}
              alt={user.name}
            />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
