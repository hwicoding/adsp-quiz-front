import { useParams, useNavigate } from 'react-router-dom'
import * as styles from './ExamResult.css'
import { ResultAnalysis } from '../../components/ResultAnalysis/ResultAnalysis'
import { useExamResult } from '../../api/exam'
import { Button } from '../../components/Button/Button'

export const ExamResult = () => {
  const { examSessionId } = useParams<{ examSessionId: string }>()
  const navigate = useNavigate()
  const { data: result, isLoading, isError } = useExamResult(examSessionId || null)

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>결과를 불러오는 중...</div>
      </div>
    )
  }

  if (isError || !result) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          결과를 불러오는 중 오류가 발생했습니다.
          <Button onClick={() => navigate('/mypage')}>마이페이지로 이동</Button>
        </div>
      </div>
    )
  }

  const wrongAnswers = result.totalQuestions - result.correctAnswers
  const unanswered = result.answers.filter((a) => a.selectedAnswer === -1).length

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>시험 결과</h1>
      </div>

      <div className={styles.content}>
        <ResultAnalysis
          totalQuestions={result.totalQuestions}
          correctAnswers={result.correctAnswers}
          wrongAnswers={wrongAnswers}
          unanswered={unanswered}
        />

        <div className={styles.answerList}>
          <h2 className={styles.sectionTitle}>문제별 정답 확인</h2>
          {result.answers.map((answer, index) => (
            <div key={answer.quizId} className={styles.answerItem}>
              <div className={styles.answerHeader}>
                <span className={styles.questionNumber}>문제 {index + 1}</span>
                {answer.isCorrect ? (
                  <span className={styles.correctBadge}>정답</span>
                ) : (
                  <span className={styles.wrongBadge}>오답</span>
                )}
              </div>
              <div className={styles.questionText}>{answer.question}</div>
              <div className={styles.answerInfo}>
                <span>선택한 답: {answer.selectedAnswer === -1 ? '미답' : `${answer.selectedAnswer + 1}번`}</span>
                <span>정답: {answer.correctAnswer + 1}번</span>
              </div>
              {answer.explanation && (
                <div className={styles.explanation}>{answer.explanation}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <Button variant="primary" onClick={() => navigate('/exam')}>
          다시 시험 보기
        </Button>
        <Button variant="outline" onClick={() => navigate('/mypage')}>
          마이페이지로 이동
        </Button>
      </div>
    </div>
  )
}
