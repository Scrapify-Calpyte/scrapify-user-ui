import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const containerStyle = {
    width: '100%',
    height: window.innerHeight - 65
};

const center = {
    lat: 13.0827,
    lng: 80.2707
};

function MapComponent({ handlePopOver }) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [location, setLocation] = useState(null);
    const [map, setMap] = React.useState(null);
    const [infoOptions, setInfoOptions] = useState({});

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

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    });

    const onLoad = React.useCallback(function callback(map) {
        setInfoOptions({
            pixelOffset: new window.google.maps.Size(0, -30)
        });
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
        clickable: true,
        draggable: false,
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: {
                width: 40,
                height: 40
            }
        },
        position: center,
        style: { pointerEvents: 'none' }
    };

    const mapOptions = {
        minZoom: 5,
        maxZoom: 15
    };

    return isLoaded ? (
        <GoogleMap zoom={8} mapContainerStyle={containerStyle} options={mapOptions} center={location} onLoad={onLoad} onUnmount={onUnmount}>
            {markers.map((marker, index) => (
                <Marker
                    options={markerOptions}
                    key={index}
                    position={{ lat: marker?.lat, lng: marker?.lng }}
                    onClick={(e) => setSelectedMarker(marker)}
                />
            ))}
            {location ? <Marker position={location} /> : <></>}
            {selectedMarker && (
                <InfoWindow
                    options={infoOptions}
                    position={selectedMarker}
                    onCloseClick={() => {
                        setSelectedMarker(null);
                        handlePopOver(false);
                    }}
                >
                    <ListItemButton sx={{ padding: 0, width: 300 }} selected={false} onClick={(event) => handlePopOver(true)}>
                        <ListItemIcon>
                            <Avatar
                                src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                variant="square"
                                alt="P"
                                sx={{ height: 50, width: 50 }}
                            ></Avatar>
                        </ListItemIcon>
                        <div className="container" style={{ lineHeight: 1.5 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ color: '#013f56', fontWeight: 'bold' }}>Dinesh</div>
                                <div style={{ color: 'grey', fontWeight: 'bold' }}>
                                    <LocationOnIcon style={{ fontSize: '15px' }} />
                                    20km
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <Tooltip title={'Dinesh'} arrow>
                                    <div className="chip">Bottles</div>
                                </Tooltip>
                                &nbsp;
                                <Tooltip title={'Dinesh'} arrow>
                                    <div className="chip">Bottles</div>
                                </Tooltip>{' '}
                                &nbsp;
                                <Tooltip title={'Dinesh'} arrow>
                                    <div className="chip">Bottles</div>
                                </Tooltip>{' '}
                                &nbsp;
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '11px'
                                }}
                            >
                                <div style={{ color: '#013f56', fontWeight: 'bold', display: 'flex', alignItems: 'end' }}>
                                    <StarRateRoundedIcon sx={{ color: 'orange' }} style={{ fontSize: '20px' }} />
                                    &nbsp; 4.0
                                </div>
                                <div style={{ color: 'grey' }}>58K Reviews</div>
                                <div style={{ color: '#1bd7a0' }}>View Details</div>
                            </div>
                        </div>
                    </ListItemButton>
                </InfoWindow>
            )}
            <Circle
                center={location}
                radius={10 * 1000}
                options={{
                    fillColor: '#1bd7a0',
                    strokeColor: '#1bd7a0',
                    strokeWeight: 0
                }}
            />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(MapComponent);
