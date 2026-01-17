import { useEffect, useRef } from 'react'
import * as styles from './Timer.css'

interface TimerProps {
  seconds: number
  isRunning?: boolean
  onPause?: () => void
  onResume?: () => void
  onTick?: (remainingSeconds: number) => void
  onTimeUp?: () => void
}

export const Timer = ({
  seconds,
  isRunning = false,
  onPause,
  onResume,
  onTick,
  onTimeUp,
}: TimerProps) => {
  const intervalRef = useRef<number | null>(null)
  const currentSecondsRef = useRef(seconds)

  useEffect(() => {
    currentSecondsRef.current = seconds
  }, [seconds])

  useEffect(() => {
    if (isRunning && currentSecondsRef.current > 0) {
      intervalRef.current = window.setInterval(() => {
        currentSecondsRef.current -= 1
        onTick?.(currentSecondsRef.current)

        if (currentSecondsRef.current <= 0) {
          clearInterval(intervalRef.current!)
          onTimeUp?.()
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, onTick, onTimeUp])

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
