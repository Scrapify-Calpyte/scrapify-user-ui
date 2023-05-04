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

function MapComponent({ location, consumersData }) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [map, setMap] = React.useState(null);
    const [infoOptions, setInfoOptions] = useState({});
    const [isShowMore, setIsShowMore] = useState(false);
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
            {consumersData?.length > 0 &&
                consumersData.map((marker, index) => (
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
                    <Stack spacing={2}>
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
                                {selectedMarker.stock?.length > 0 &&
                                    selectedMarker.stock.map((item, index) => {
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
                        {isShowMore && (
                            <>
                                <Typography variant="p" fontWeight="bold" color="#013f56" component="div">
                                    Images
                                </Typography>
                                <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: 2 }}>
                                    {selectedMarker?.stock?.length > 0 &&
                                        selectedMarker?.stock.map((p, index) => {
                                            return (
                                                <Avatar
                                                    key={index}
                                                    alt="waste"
                                                    src="https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzdGV8ZW58MHx8MHx8&w=1000&q=80"
                                                    variant="square"
                                                    sx={{ height: 75, width: '24%' }}
                                                />
                                            );
                                        })}
                                </div>
                                <Typography variant="p" fontWeight="bold" color="#013f56" component="div">
                                    Seller Location
                                </Typography>
                                <Typography variant="p" color="#013f56" component="div">
                                    {selectedMarker?.displayLocation?.address}
                                </Typography>
                            </>
                        )}
                        <Stack flexDirection="row" sx={{ justifyContent: 'space-between', width: '100%' }} gap={2}>
                            <button className="btn1" style={{ width: '50%' }}>
                                Bid Now
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsShowMore(!isShowMore)}
                                style={{ color: '#1bd7a0', border: 'none', width: '50%' }}
                            >
                                {isShowMore ? 'View less' : 'View More'}
                            </button>
                        </Stack>
                    </Stack>
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
