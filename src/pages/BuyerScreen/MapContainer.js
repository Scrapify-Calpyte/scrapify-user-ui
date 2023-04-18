import React, { useState, useEffect } from 'react';

function MapContainer() {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [circles, setCircles] = useState([]);
    const [infoWindows, setInfoWindows] = useState([]);

    useEffect(() => {
        initMap();
    }, []);

    function initMap() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.7749, lng: -122.4194 },
            zoom: 13
        });

        setMap(map);

        // Create markers
        const marker1 = new window.google.maps.Marker({
            position: { lat: 37.7749, lng: -122.4194 },
            map: map,
            title: 'Marker 1'
        });

        const marker2 = new window.google.maps.Marker({
            position: { lat: 37.773972, lng: -122.431297 },
            map: map,
            title: 'Marker 2'
        });

        marker1.addListener('click', () => {
            console.log('Marker 1 clicked');
        });

        // Add click event listener to marker 2
        marker2.addListener('click', () => {
            console.log('Marker 2 clicked');
        });

        setMarkers([marker1, marker2]);

        // Create circles
        const circle1 = new window.google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: { lat: 37.7749, lng: -122.4194 },
            radius: 1000 // meters
        });

        const circle2 = new window.google.maps.Circle({
            strokeColor: '#00FF00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#00FF00',
            fillOpacity: 0.35,
            map: map,
            center: { lat: 37.773972, lng: -122.431297 },
            radius: 500 // meters
        });

        setCircles([circle1, circle2]);

        // Create info windows
        const infoWindow1 = new window.google.maps.InfoWindow({
            content: 'Info Window 1'
        });

        const infoWindow2 = new window.google.maps.InfoWindow({
            content: 'Info Window 2'
        });

        infoWindow1.open(map, marker1);
        infoWindow2.open(map, marker2);

        setInfoWindows([infoWindow1, infoWindow2]);
    }

    return <div id="map" style={{ height: window.innerHeight - 65, width: '100%' }}></div>;
}

export default MapContainer;
