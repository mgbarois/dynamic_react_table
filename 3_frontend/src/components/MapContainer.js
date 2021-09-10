import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
        coordinates: []
    };

    componentDidMount() {
        fetch("http://localhost:3001/api/coordinates")
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({
                    coordinates: data
                });
            })
            .catch((err) => console.log(err));
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={6}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 51.365582663699115,
                        lng: 10.263583207532035
                    }
                }

            >
                {
                    this.state.coordinates.map((coor, i) => {
                        return (<Marker key={i}
                            position={{ lat: coor.lat, lng: coor.lng }}
                            onClick={this.onMarkerClick}
                            name={coor.number}
                        />)
                    })
                }

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);


// Resources
// https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
// https://react-google-maps-api-docs.netlify.app/