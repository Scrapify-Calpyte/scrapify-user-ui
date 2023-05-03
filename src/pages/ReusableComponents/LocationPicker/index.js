import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';

function LocationPicker({ location, setLocation, height = '50vh' }) {
    const [map, setMap] = React.useState(null);

    const containerStyle = {
        width: '100%',
        height: height
    };

    useEffect(() => {}, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    });

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const markerOptions = {
        clickable: true,
        draggable: true,
        icon: {
            url: 'https://www.shareicon.net/data/512x512/2016/07/24/800943_location_512x512.png',
            scaledSize: {
                width: 40,
                height: 40
            }
        },
        style: { pointerEvents: 'none' }
    };

    const mapOptions = {
        minZoom: 2,
        maxZoom: 32
    };

    const onMarkerDragEnd = (event) => {
        setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    };

    return isLoaded ? (
        <GoogleMap zoom={8} mapContainerStyle={containerStyle} options={mapOptions} center={location} onLoad={onLoad} onUnmount={onUnmount}>
            <Marker onDragEnd={onMarkerDragEnd} position={location} options={markerOptions} />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default LocationPicker;
