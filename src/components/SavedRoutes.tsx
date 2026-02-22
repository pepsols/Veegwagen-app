import { useState, useEffect } from 'react'
import { Route, supabase } from '../lib/supabase'
import styles from './SavedRoutes.module.css'

interface SavedRoutesProps {
  onRouteSelect: (route: Route) => void
}

export default function SavedRoutes({ onRouteSelect }: SavedRoutesProps) {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    loadRoutes()
  }, [])

  const loadRoutes = async () => {
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('routes')
        .select('*')
        .order('created_at', { ascending: false })

      if (err) throw err
      setRoutes(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load routes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error: err } = await supabase.from('routes').delete().eq('id', id)
      if (err) throw err
      setRoutes(routes.filter(r => r.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete route')
    }
  }

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`
    }
    return `${Math.round(meters)} m`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.toggleBtn}
        onClick={() => setShowPanel(!showPanel)}
        title="View saved routes"
      >
        📋
      </button>

      {showPanel && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2>Saved Routes</h2>
            <button className={styles.closeBtn} onClick={() => setShowPanel(false)}>
              ×
            </button>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          {loading ? (
            <div className={styles.loading}>Loading routes...</div>
          ) : routes.length === 0 ? (
            <div className={styles.empty}>No saved routes yet</div>
          ) : (
            <div className={styles.list}>
              {routes.map(route => (
                <div key={route.id} className={styles.routeCard}>
                  <div className={styles.routeInfo}>
                    <h3>{route.name}</h3>
                    <p className={styles.details}>
                      {formatDistance(route.distance)} • {route.coordinates.length} points
                    </p>
                    <p className={styles.date}>{formatDate(route.created_at)}</p>
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => {
                        onRouteSelect(route)
                        setShowPanel(false)
                      }}
                    >
                      View
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(route.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
