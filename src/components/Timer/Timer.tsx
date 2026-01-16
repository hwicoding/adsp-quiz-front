import * as styles from './Timer.css'

interface TimerProps {
  seconds: number
  isRunning?: boolean
  onPause?: () => void
  onResume?: () => void
}

export const Timer = ({ seconds, isRunning = false, onPause, onResume }: TimerProps) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const formatTime = (value: number) => String(value).padStart(2, '0')

  return (
    <div className={styles.timer}>
      <div className={styles.timeDisplay}>
        {hours > 0 && (
          <>
            <span className={styles.timeUnit}>{formatTime(hours)}</span>
            <span className={styles.separator}>:</span>
          </>
        )}
        <span className={styles.timeUnit}>{formatTime(minutes)}</span>
        <span className={styles.separator}>:</span>
        <span className={styles.timeUnit}>{formatTime(secs)}</span>
      </div>
      {onPause && onResume && (
        <button
          className={styles.controlButton}
          onClick={isRunning ? onPause : onResume}
        >
          {isRunning ? '일시정지' : '재개'}
        </button>
      )}
    </div>
  )
}
