import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle, InfoWindow } from 'google-maps-react';

const MapContainer = (props) => {
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    };

    const onClose = (props) => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    };

    const mapStyles = {
        width: window.innerWidth - 300,
        height: window.innerHeight - 200,
        margin: 0,
        padding: 0
    };

    const center = {
        lat: 37.7749,
        lng: -122.4194
    };

    const radius = 10000; // radius in meters

    return (
        <Map google={props.google} initialCenter={center} zoom={12} style={{ zIndex: -1 }}>
            <Marker onClick={onMarkerClick} name={'Marker'} position={center} />
            <Circle
                center={center}
                radius={radius}
                strokeColor="transparent"
                strokeOpacity={0}
                strokeWeight={5}
                fillColor="#FF0000"
                fillOpacity={0.2}
            />

            <InfoWindow marker={activeMarker} visible={showingInfoWindow} onClose={onClose}>
                <div>
                    <h4>{selectedPlace.name}</h4>
                </div>
            </InfoWindow>
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'
})(MapContainer);
