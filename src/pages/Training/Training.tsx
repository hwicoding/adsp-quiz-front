import { useState } from 'react'
import * as styles from './Training.css'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { Quiz } from '../../components/QuizCard/QuizCard.types'

const dummyQuiz: Quiz = {
  id: '1',
  question: '다음 중 데이터 분석에서 사용되는 기법이 아닌 것은?',
  options: [
    '회귀 분석',
    '군집 분석',
    '의사결정나무',
    '이미지 처리',
  ],
  correctAnswer: 3,
  explanation: '이미지 처리는 컴퓨터 비전 분야의 기법으로, 데이터 분석의 핵심 기법은 아닙니다.',
  category: '데이터 분석 기초',
}

export const Training = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showAnswer, setShowAnswer] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
  }

  const handleNext = () => {
    setSelectedAnswer(undefined)
    setShowAnswer(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>학습 모드</h1>
        <div className={styles.progress}>
          문제 1 / 10
        </div>
      </div>

      <div className={styles.content}>
        <QuestionDisplay
          quiz={dummyQuiz}
          selectedAnswer={selectedAnswer}
          showAnswer={showAnswer}
          onAnswerSelect={handleAnswerSelect}
        />
      </div>

      {showAnswer && (
        <div className={styles.footer}>
          <button className={styles.nextButton} onClick={handleNext}>
            다음 문제
          </button>
        </div>
      )}
    </div>
  )
}
