import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';

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
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
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
            lat: 11.0168,
            lng: 76.9558
        },
        {
            lat: 9.9252,
            lng: 78.1198
        }
    ];

    const markerOptions = {
        icon: {
            url: LocationOnIcon,
            // 'https://e7.pngegg.com/pngimages/508/387/png-clipart-google-maps-google-map-maker-pritchard-community-center-marker-pen-map-blue-globe.png',
            scaledSize: {
                width: 32,
                height: 32
            }
        }
    };

    const mapOptions = {
        minZoom: 5,
        maxZoom: 15,
        zoom: 3
    };

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} options={mapOptions} center={location} onLoad={onLoad} onUnmount={onUnmount}>
            {markers.map((marker, index) => (
                <Marker key={index} position={{ lat: marker?.lat, lng: marker?.lng }} onClick={() => onMarkerClick(marker)} />
            ))}
            {location && (
                <Marker
                    position={location}
                    icon={{
                        url: MyLocationIcon,
                        scaledSize: new window.google.maps.Size(40, 40),
                        anchor: new window.google.maps.Point(20, 40)
                    }}
                />
            )}
            {selectedMarker && (
                <InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} onCloseClick={onCloseClick}>
                    <div>Info Window Content</div>
                </InfoWindow>
            )}
            <Circle
                center={location}
                radius={50000}
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
