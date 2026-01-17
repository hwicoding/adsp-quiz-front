import { useNavigate } from 'react-router-dom'
import * as styles from './Home.css'
import { Button } from '../../components/Button/Button'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>ADsP AI Pass</h1>
        <p className={styles.subtitle}>
          데이터 분석 준전문가 합격을 위한 맞춤형 문제 풀이 서비스
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>0</div>
          <div className={styles.statLabel}>풀이한 문제</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>0%</div>
          <div className={styles.statLabel}>평균 정답률</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>0</div>
          <div className={styles.statLabel}>완료한 모의고사</div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/training')}
        >
          학습 모드 시작
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/exam')}
        >
          모의고사 시작
        </Button>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>최근 활동</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <span className={styles.activityText}>아직 활동 내역이 없습니다.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
