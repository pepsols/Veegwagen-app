import styles from './StartMenu.module.css'

interface StartMenuProps {
  onRecordRoute: () => void
  onNavigateRoute: () => void
  onDriveRoute: () => void
}

export default function StartMenu({ onRecordRoute, onNavigateRoute, onDriveRoute }: StartMenuProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
            <path
              d="M50 20 L65 50 L50 80 L35 50 Z"
              fill="currentColor"
              opacity="0.8"
            />
            <circle cx="50" cy="50" r="8" fill="white" />
          </svg>
        </div>

        <h1>VeegRoute</h1>
        <p className={styles.subtitle}>Route Tracker</p>

        <div className={styles.menu}>
          <button className={styles.option} onClick={onRecordRoute}>
            <div className={styles.optionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className={styles.optionText}>
              <h2>Route opnemen</h2>
              <p>Nieuwe route opnemen met GPS</p>
            </div>
          </button>

          <button className={styles.option} onClick={onDriveRoute}>
            <div className={styles.optionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 17h2v.5M1 17h2v.5M19 13H3c-1 0-1-1-1-2V8c0-1 0-2 1-2h16c1 0 1 1 1 2v3c0 1 0 2-1 2z" />
                <circle cx="6.5" cy="17.5" r="2.5" />
                <circle cx="17.5" cy="17.5" r="2.5" />
              </svg>
            </div>
            <div className={styles.optionText}>
              <h2>Route rijden</h2>
              <p>Volg een opgeslagen route</p>
            </div>
          </button>

          <button className={styles.option} onClick={onNavigateRoute}>
            <div className={styles.optionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className={styles.optionText}>
              <h2>Navigeer naar start</h2>
              <p>Ga terug naar het begin van de route</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
