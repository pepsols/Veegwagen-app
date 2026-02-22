import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import MapView from './components/MapView';
import TrackingPanel from './components/TrackingPanel';
import SavedRoutes from './components/SavedRoutes';
import { supabase } from './lib/supabase';
import styles from './App.module.css';
export default function App() {
    const [center, setCenter] = useState([52.52, 13.405]);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [durationInterval, setDurationInterval] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCenter([latitude, longitude]);
            }, (error) => {
                console.log('Geolocation error:', error);
            });
        }
    }, []);
    useEffect(() => {
        if (!isTracking)
            return;
        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            const newCoord = [latitude, longitude];
            setCenter(newCoord);
            setRouteCoordinates((prev) => [...prev, newCoord]);
        }, (error) => {
            console.log('Geolocation tracking error:', error);
        }, { enableHighAccuracy: true, maximumAge: 0 });
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [isTracking]);
    useEffect(() => {
        if (routeCoordinates.length >= 2) {
            let totalDistance = 0;
            for (let i = 0; i < routeCoordinates.length - 1; i++) {
                const [lat1, lng1] = routeCoordinates[i];
                const [lat2, lng2] = routeCoordinates[i + 1];
                totalDistance += calculateDistance(lat1, lng1, lat2, lng2);
            }
            setDistance(totalDistance);
        }
    }, [routeCoordinates]);
    useEffect(() => {
        if (!isTracking) {
            if (durationInterval !== null) {
                clearInterval(durationInterval);
                setDurationInterval(null);
            }
            return;
        }
        const interval = window.setInterval(() => {
            setDuration((prev) => prev + 1);
        }, 1000);
        setDurationInterval(interval);
        return () => {
            clearInterval(interval);
        };
    }, [isTracking]);
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371000;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLng = ((lng2 - lng1) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    const handleStartTracking = () => {
        setIsTracking(true);
        setRouteCoordinates([]);
        setDistance(0);
        setDuration(0);
    };
    const handleStopTracking = () => {
        setIsTracking(false);
    };
    const handleMapClick = (coords) => {
        if (isTracking) {
            setRouteCoordinates((prev) => [...prev, coords]);
        }
    };
    const handleSaveRoute = async (name) => {
        try {
            const { error } = await supabase.from('routes').insert({
                name,
                coordinates: routeCoordinates,
                distance,
                duration,
            });
            if (error)
                throw error;
            alert('Route saved successfully!');
            setRouteCoordinates([]);
            setDistance(0);
            setDuration(0);
        }
        catch (err) {
            alert(`Failed to save route: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };
    const handleClear = () => {
        setRouteCoordinates([]);
        setDistance(0);
        setDuration(0);
    };
    const handleRouteSelect = (route) => {
        setRouteCoordinates(route.coordinates);
        setDistance(route.distance);
        setDuration(route.duration);
        setIsTracking(false);
    };
    return (_jsxs("div", { className: styles.app, children: [_jsx(MapView, { center: center, routeCoordinates: routeCoordinates, onMapClick: handleMapClick, isTracking: isTracking }), _jsx(TrackingPanel, { isTracking: isTracking, distance: distance, duration: duration, coordinateCount: routeCoordinates.length, onStart: handleStartTracking, onStop: handleStopTracking, onSave: handleSaveRoute, onClear: handleClear }), _jsx(SavedRoutes, { onRouteSelect: handleRouteSelect })] }));
}
