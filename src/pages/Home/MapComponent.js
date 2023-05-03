import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Grid, Stack, Typography, IconButton } from '@mui/material/index';
import { Polyline } from '@react-google-maps/api';

const center = {
    lat: 13.0827,
    lng: 80.2707
};

function MapComponent({ location, consumersData, handlePopOver }) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [map, setMap] = React.useState(null);
    const [infoOptions, setInfoOptions] = useState({});
    const containerStyle = {
        width: '100%',
        height: '92vh'
    };

    useEffect(() => {}, []);

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
        // position: center,
        style: { pointerEvents: 'none' }
    };

    const mapOptions = {
        minZoom: 2,
        maxZoom: 32
    };

    const path = [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 }
    ];

    const options = {
        strokeColor: 'yellow',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'yellow',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 }
        ],
        zIndex: 1
    };

    return isLoaded ? (
        <GoogleMap zoom={8} mapContainerStyle={containerStyle} options={mapOptions} center={location} onLoad={onLoad} onUnmount={onUnmount}>
            {consumersData.map((marker, index) => (
                <Marker
                    options={markerOptions}
                    key={index}
                    position={{ lat: marker?.displayLocation?.coordinates[0], lng: marker?.displayLocation?.coordinates[1] }}
                    onClick={(e) => setSelectedMarker(marker)}
                />
            ))}
            {location ? <Marker position={location} /> : <></>}
            <Polyline onLoad={onLoad} path={path} options={options} />
            {selectedMarker && (
                <InfoWindow
                    options={infoOptions}
                    position={{
                        lat: selectedMarker?.displayLocation?.coordinates[0],
                        lng: selectedMarker?.displayLocation?.coordinates[1]
                    }}
                    onCloseClick={() => {
                        setSelectedMarker(null);
                        handlePopOver(false);
                    }}
                >
                    <Grid container spacing={0}>
                        {/* <Grid item md={12} xs={12} sm={12} sx={{ paddingBottom: '5px' }}>
                            <Stack flexDirection="row" gap={2} justifyContent="flex-start">
                                <Avatar
                                    src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                    variant="square"
                                    alt="P"
                                    sx={{ height: 50, width: 50 }}
                                ></Avatar>
                                <Stack>
                                    <Typography sx={{ color: '#013f56', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <b>{selectedMarker?.seller?.firstName + selectedMarker?.seller?.lastName}</b>
                                        <>
                                            <StarRateRoundedIcon sx={{ color: 'orange' }} style={{ fontSize: '20px' }} />
                                            <b style={{ fontSize: '12px' }}>{selectedMarker?.seller?.rating}</b>
                                        </>
                                    </Typography>
                                    <Typography sx={{ color: 'grey', fontWeight: 'bold' }}>
                                        <LocationOnIcon style={{ fontSize: '15px' }} />
                                        20km
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid> */}
                        {/* <Stack flexDirection="row" gap={2}>
                            <Avatar
                                src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                variant="square"
                                alt="P"
                                sx={{ height: 50, width: 50 }}
                            ></Avatar>
                            <Typography sx={{ color: '#013f56' }}>
                                <b>{selectedMarker?.seller?.firstName + selectedMarker?.seller?.lastName}</b>
                            </Typography>
                        </Stack> */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            <Avatar
                                src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                variant="square"
                                alt="P"
                                sx={{ height: 50, width: 50 }}
                            ></Avatar>
                            <Typography sx={{ color: '#013f56' }}>
                                <b>{selectedMarker?.seller?.firstName + selectedMarker?.seller?.lastName}</b>
                            </Typography>
                        </div>
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th>ScrapType</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMarker.stock.map((item, index) => {
                                    return (
                                        <tr key={index} style={{ alignItems: 'center' }}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar size="small" variant="square" alt="P"></Avatar>
                                                    <Typography component="div" variant="p">
                                                        {item?.name}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td align="center">
                                                <Typography component="div" variant="p">
                                                    {item?.quantity + item?.unit?.name}
                                                </Typography>
                                            </td>
                                            <td align="center">
                                                <Typography component="div" variant="p">
                                                    {item?.price}
                                                </Typography>
                                            </td>
                                            <td></td>
                                        </tr>
                                    );
                                })}
                                <tr></tr>
                            </tbody>
                        </table>

                        {/* <Grid item md={12} xs={12} sm={12} sx={{ paddingTop: '5px' }}>
                            <Stack flexDirection="row" sx={{ justifyContent: 'space-between', width: '100%' }} gap={2}>
                                <button className="btn1" style={{ width: '50%' }}>
                                    Bid Now
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePopOver(true)}
                                    style={{ color: '#1bd7a0', border: 'none', width: '50%' }}
                                >
                                    View Details
                                </button>
                            </Stack>
                        </Grid> */}
                    </Grid>
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
