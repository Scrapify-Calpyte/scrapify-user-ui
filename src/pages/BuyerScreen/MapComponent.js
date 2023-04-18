import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: window.innerHeight - 65
};

const center = {
    lat: 13.0827,
    lng: 80.2707
};

function MapComponent() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                setLocation(center);
                console.log(error);
                alert('Location is not enabled and default location is chennai');
            }
        );
    }, []);

    const onMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    const onCloseClick = () => {
        setSelectedMarker(null);
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const markers = [
        {
            lat: 13.0827,
            lng: 80.2707
        },
        {
            lat: 13.0418,
            lng: 80.2341
        },
        {
            lat: 13.0694,
            lng: 80.1948
        }
    ];

    const markerOptions = {
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            scaledSize: {
                width: 40,
                height: 40
            }
        }
    };

    const mapOptions = {
        minZoom: 5,
        maxZoom: 15,
        zoom: 8
    };

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} options={mapOptions} center={location} onLoad={onLoad} onUnmount={onUnmount}>
            {markers.map((marker, index) => (
                <Marker
                    options={markerOptions}
                    key={index}
                    position={{ lat: marker?.lat, lng: marker?.lng }}
                    onClick={() => onMarkerClick(marker)}
                />
            ))}
            {location ? <Marker position={location} /> : <></>}
            {selectedMarker && (
                <InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} onCloseClick={onCloseClick}>
                    <div>Info Window Content</div>
                </InfoWindow>
            )}
            <Circle
                center={location}
                radius={10 * 1000}
                options={{
                    fillColor: '#ff0000',
                    strokeColor: '#ff0000',
                    strokeWeight: 0
                }}
            />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MapComponent);
