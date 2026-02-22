import { useState } from 'react'
import styles from './TrackingPanel.module.css'

interface TrackingPanelProps {
  isTracking: boolean
  distance: number
  duration: number
  coordinateCount: number
  onStart: () => void
  onStop: () => void
  onSave: (name: string) => void
  onClear: () => void
}

export default function TrackingPanel({
  isTracking,
  distance,
  duration,
  coordinateCount,
  onStart,
  onStop,
  onSave,
  onClear,
}: TrackingPanelProps) {
  const [saveModal, setSaveModal] = useState(false)
  const [routeName, setRouteName] = useState('')

  const handleSave = () => {
    if (routeName.trim()) {
      onSave(routeName)
      setRouteName('')
      setSaveModal(false)
    }
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`
    }
    return `${Math.round(meters)} m`
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h1>VeegRoute</h1>
        <p className={styles.subtitle}>Route Tracking</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.label}>Distance</span>
          <span className={styles.value}>{formatDistance(distance)}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Duration</span>
          <span className={styles.value}>{formatTime(duration)}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Points</span>
          <span className={styles.value}>{coordinateCount}</span>
        </div>
      </div>

      <div className={styles.controls}>
        {!isTracking ? (
          <button className={styles.startBtn} onClick={onStart}>
            Start Tracking
          </button>
        ) : (
          <button className={styles.stopBtn} onClick={onStop}>
            Stop Tracking
          </button>
        )}

        {coordinateCount > 0 && (
          <>
            <button
              className={styles.saveBtn}
              onClick={() => setSaveModal(true)}
              disabled={isTracking}
            >
              Save Route
            </button>
            <button
              className={styles.clearBtn}
              onClick={onClear}
              disabled={isTracking}
            >
              Clear
            </button>
          </>
        )}
      </div>

      {saveModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Save Route</h2>
            <input
              type="text"
              placeholder="Enter route name"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
            <div className={styles.modalActions}>
              <button onClick={handleSave} className={styles.confirmBtn}>
                Save
              </button>
              <button onClick={() => setSaveModal(false)} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
