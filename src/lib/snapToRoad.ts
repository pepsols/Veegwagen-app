import { LatLngTuple } from 'leaflet'

const SNAP_THRESHOLD = 50

export async function snapToRoad(coord: LatLngTuple): Promise<LatLngTuple> {
  try {
    const [lat, lng] = coord
    const response = await fetch(
      `https://snap.openstreetmap.de/snapped/${lng},${lat}?format=json`,
      { signal: AbortSignal.timeout(5000) }
    )

    if (!response.ok) return coord

    const data = await response.json() as { lat?: number; lon?: number; distance?: number }

    if (!data.lat || !data.lon) return coord
    if (data.distance && data.distance > SNAP_THRESHOLD) return coord

    return [data.lat, data.lon]
  } catch {
    return coord
  }
}

export async function snapMultiplePoints(coords: LatLngTuple[]): Promise<LatLngTuple[]> {
  const results = await Promise.allSettled(
    coords.map(coord => snapToRoad(coord))
  )

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    }
    return coords[index]
  })
}
