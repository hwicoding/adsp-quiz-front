import * as styles from './ResultAnalysis.css'

interface ResultAnalysisProps {
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  unanswered?: number
  timeSpent?: number
}

export const ResultAnalysis = ({
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  unanswered = 0,
  timeSpent,
}: ResultAnalysisProps) => {
  const score = Math.round((correctAnswers / totalQuestions) * 100)
  const accuracy = Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100) || 0

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}시간 ${minutes}분 ${secs}초`
    }
    return `${minutes}분 ${secs}초`
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>시험 결과</h2>
        <div className={styles.score}>{score}점</div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>정답</div>
          <div className={`${styles.statValue} ${styles.statCorrect}`}>
            {correctAnswers}문항
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>오답</div>
          <div className={`${styles.statValue} ${styles.statWrong}`}>
            {wrongAnswers}문항
          </div>
        </div>
        {unanswered > 0 && (
          <div className={styles.statCard}>
            <div className={styles.statLabel}>미답</div>
            <div className={`${styles.statValue} ${styles.statUnanswered}`}>
              {unanswered}문항
            </div>
          </div>
        )}
        <div className={styles.statCard}>
          <div className={styles.statLabel}>정답률</div>
          <div className={styles.statValue}>{accuracy}%</div>
        </div>
      </div>

      {timeSpent !== undefined && (
        <div className={styles.timeInfo}>
          <span className={styles.timeLabel}>소요 시간:</span>
          <span className={styles.timeValue}>{formatTime(timeSpent)}</span>
        </div>
      )}

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
