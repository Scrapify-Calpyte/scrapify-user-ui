import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import Avatar from '@mui/material/Avatar';
import { Stack, Typography, Box } from '@mui/material/index';
import PropTypes from 'prop-types';
import { ThemeButton, ThemeButton2 } from '~/util/MyComponents';
import { useTheme } from '@mui/material/styles';

function MapComponent({ location, consumersData, placeBid }) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [map, setMap] = React.useState(null);
    const [infoOptions, setInfoOptions] = useState({});
    const [isShowMore, setIsShowMore] = useState(false);
    const { palette, typography } = useTheme();

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
            pixelOffset: new window.google.maps.Size(0, -30),
            maxWidth: '30vw'
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
            url: 'https://www.shareicon.net/data/512x512/2016/07/24/800943_location_512x512.png',
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
        strokeColor: palette.secondary.main,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: palette.secondary.main,
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

    const tableHeaderStyle = {
        fontWeight: '500',
        color: palette.grey.main
    };

    const tableBodyStyle = {
        fontWeight: 'bold',
        fontSize: '15px',
        // lineHeight: ' 24px',
        // leadingTrim: 'both',
        // textEdge: 'cap',
        color: palette.dark.main
    };

    return isLoaded ? (
        <GoogleMap
            zoom={12}
            mapContainerStyle={containerStyle}
            options={mapOptions}
            center={location}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
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
            {/* <Polyline onLoad={onLoad} path={path} options={options} /> */}
            {selectedMarker && (
                <InfoWindow
                    options={infoOptions}
                    position={{
                        lat: selectedMarker?.displayLocation?.coordinates[0],
                        lng: selectedMarker?.displayLocation?.coordinates[1]
                    }}
                    onCloseClick={() => {
                        setSelectedMarker(null);
                        // handlePopOver(false);
                    }}
                >
                    <Stack spacing={2} style={{ width: '100%', maxWidth: '90vw' }}>
                        <Stack flexDirection="row" gap={1} alignItems="start">
                            <Avatar
                                src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/img/avatars/team1.jpg"
                                variant="square"
                                alt="P"
                                sx={{ height: 50, width: 50 }}
                            ></Avatar>
                            <Typography color="secondary">
                                <b>{selectedMarker?.seller?.firstName + selectedMarker?.seller?.lastName}</b>
                            </Typography>
                        </Stack>
                        <table className="table table-responsive" style={{ fontFamily: typography.fontFamily }}>
                            <thead>
                                <tr>
                                    <td style={tableHeaderStyle}>SCRAP TYPE</td>
                                    <td style={tableHeaderStyle}>QUANTITY</td>
                                    <td style={tableHeaderStyle}>MARKET PRICE</td>
                                    <td style={tableHeaderStyle}>EXPECTED PRICE</td>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMarker.stock?.length > 0 &&
                                    selectedMarker.stock.map((item, index) => {
                                        return (
                                            <tr key={index} style={{ alignItems: 'center' }}>
                                                <td style={tableBodyStyle}>
                                                    <div style={{ display: 'flex', gap: 5 }}>
                                                        <Avatar size="small" variant="rounded" alt="p"></Avatar>
                                                        <Typography component="div" variant="p">
                                                            {item?.name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td style={tableBodyStyle}>
                                                    <Typography component="div" variant="p">
                                                        {item?.quantity + item?.unit?.name}
                                                    </Typography>
                                                </td>
                                                <td style={tableBodyStyle}>
                                                    <Typography component="div" variant="p">
                                                        {item?.price}
                                                    </Typography>
                                                </td>
                                                <td style={tableBodyStyle}>
                                                    <Typography component="div" variant="p">
                                                        {item?.price}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                <tr></tr>
                            </tbody>
                        </table>
                        {isShowMore && (
                            <>
                                <Typography variant="subtitle1" fontWeight="bold" color="secondary" component="div">
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
                                                    variant="rounded"
                                                    sx={{ height: 75, width: 75 }}
                                                />
                                            );
                                        })}
                                </div>
                                <Typography variant="subtitle1" fontWeight="bold" color="secondary" component="div">
                                    Seller Location
                                </Typography>
                                <Stack flexDirection="row">
                                    <Box sx={{ width: 80 }}>
                                        <Avatar
                                            alt="waste"
                                            src="https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FzdGV8ZW58MHx8MHx8&w=1000&q=80"
                                            variant="rounded"
                                            sx={{ height: 75, width: 75 }}
                                        />
                                    </Box>
                                    <Typography variant="subtitle1" color="secondary" component="div" sx={{ width: '50%' }}>
                                        {selectedMarker?.displayLocation?.address}
                                    </Typography>
                                </Stack>
                            </>
                        )}
                        <br></br>
                        <Stack flexDirection="row" sx={{ justifyContent: 'space-between', width: '100%' }} gap={2}>
                            <ThemeButton style={{ width: '50%' }} onClick={() => placeBid(true, selectedMarker)}>
                                Bid Now
                            </ThemeButton>
                            <ThemeButton2 type="button" onClick={() => setIsShowMore(!isShowMore)} style={{ width: '50%' }}>
                                {isShowMore ? 'View less' : 'View More'}
                            </ThemeButton2>
                        </Stack>
                    </Stack>
                </InfoWindow>
            )}
            <Circle
                center={location}
                radius={10 * 1000}
                options={{
                    fillColor: palette.primary.main,
                    strokeColor: palette.primary.main,
                    strokeWeight: 0
                }}
            />
        </GoogleMap>
    ) : (
        <></>
    );
}

MapComponent.propTypes = {
    location: PropTypes.any,
    consumersData: PropTypes.any,
    placeBid: PropTypes.func
};

export default React.memo(MapComponent);
