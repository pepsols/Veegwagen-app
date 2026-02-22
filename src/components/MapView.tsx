import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { LatLngTuple, Map as LeafletMap } from 'leaflet'
import L from 'leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface MapViewProps {
  center: LatLngTuple
  routeCoordinates: LatLngTuple[]
  onMapClick: (coords: LatLngTuple) => void
  isTracking: boolean
}

export default function MapView({ center, routeCoordinates, onMapClick, isTracking }: MapViewProps) {
  const mapRef = useRef<LeafletMap>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const handleMapClick = (event: any) => {
      if (!isTracking) return
      const { lat, lng } = event.latlng
      onMapClick([lat, lng])
    }

    const map = mapRef.current
    map.on('click', handleMapClick)
    return () => {
      map.off('click', handleMapClick)
    }
  }, [isTracking, onMapClick])

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {routeCoordinates.length > 0 && (
        <Polyline positions={routeCoordinates} color="#2563eb" weight={3} opacity={0.7} />
      )}

      {routeCoordinates.map((coord, idx) => (
        <Marker key={idx} position={coord} icon={markerIcon}>
          <Popup>
            Point {idx + 1}<br />
            Lat: {coord[0].toFixed(4)}, Lng: {coord[1].toFixed(4)}
          </Popup>
        </Marker>
      ))}

      {center && (
        <Marker position={center} icon={markerIcon}>
          <Popup>Current Position</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
