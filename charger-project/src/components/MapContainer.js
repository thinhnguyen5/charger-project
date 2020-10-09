import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  width: '85%',
  height: '90%',
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{lat:this.props.centerLat, lng: this.props.centerLng}}>
        {this.props.plug.map(i =><Marker key={i.id} position={{
                                                              lat: i.lat,
                                                              lng: i.lng
                                                              }}
         onClick={() => this.props.show_plug(i.id)} />)}

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDL4YopF5CO1tvYxPhImg3p2ktm5zqeq58'
})(MapContainer);