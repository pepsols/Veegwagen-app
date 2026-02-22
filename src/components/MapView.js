import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
export default function MapView({ center, routeCoordinates, onMapClick, isTracking }) {
    const mapRef = useRef(null);
    useEffect(() => {
        if (!mapRef.current)
            return;
        const handleMapClick = (event) => {
            if (!isTracking)
                return;
            const { lat, lng } = event.latlng;
            onMapClick([lat, lng]);
        };
        const map = mapRef.current;
        map.on('click', handleMapClick);
        return () => {
            map.off('click', handleMapClick);
        };
    }, [isTracking, onMapClick]);
    return (_jsxs(MapContainer, { ref: mapRef, center: center, zoom: 13, style: { width: '100%', height: '100%' }, children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 OpenStreetMap contributors' }), routeCoordinates.length > 0 && (_jsx(Polyline, { positions: routeCoordinates, color: "#2563eb", weight: 3, opacity: 0.7 })), routeCoordinates.map((coord, idx) => (_jsx(Marker, { position: coord, icon: markerIcon, children: _jsxs(Popup, { children: ["Point ", idx + 1, _jsx("br", {}), "Lat: ", coord[0].toFixed(4), ", Lng: ", coord[1].toFixed(4)] }) }, idx))), center && (_jsx(Marker, { position: center, icon: markerIcon, children: _jsx(Popup, { children: "Current Position" }) }))] }));
}
