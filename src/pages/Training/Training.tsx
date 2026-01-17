import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Training.css'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { useGenerateQuiz } from '../../api/quiz'
import type { Quiz } from '../../components/QuizCard/QuizCard.types'

export const Training = () => {
  const navigate = useNavigate()
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showAnswer, setShowAnswer] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  
  const generateQuizMutation = useGenerateQuiz()

  const handleStart = () => {
    generateQuizMutation.mutate(
      {
        source: 'text',
        content: 'ADsP 데이터 분석 준전문가 시험 문제를 생성해주세요.',
      },
      {
        onSuccess: (data) => {
          setCurrentQuiz(data.quiz)
          setQuestionNumber(1)
          setSelectedAnswer(undefined)
          setShowAnswer(false)
        },
      }
    )
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
  }

  const handleNext = () => {
    generateQuizMutation.mutate(
      {
        source: 'text',
        content: 'ADsP 데이터 분석 준전문가 시험 문제를 생성해주세요.',
      },
      {
        onSuccess: (data) => {
          setCurrentQuiz(data.quiz)
          setQuestionNumber(questionNumber + 1)
          setSelectedAnswer(undefined)
          setShowAnswer(false)
        },
      }
    )
  }

  if (!currentQuiz) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>학습 모드</h1>
        </div>
        <div className={styles.startSection}>
          <button
            className={styles.startButton}
            onClick={handleStart}
            disabled={generateQuizMutation.isPending}
          >
            {generateQuizMutation.isPending ? '문제 생성 중...' : '학습 시작하기'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>학습 모드</h1>
        <div className={styles.progress}>
          문제 {questionNumber} / 10
        </div>
      </div>

      <div className={styles.content}>
        <QuestionDisplay
          quiz={currentQuiz}
          selectedAnswer={selectedAnswer}
          showAnswer={showAnswer}
          onAnswerSelect={handleAnswerSelect}
        />
      </div>

      {showAnswer && (
        <div className={styles.footer}>
          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={generateQuizMutation.isPending}
          >
            {generateQuizMutation.isPending ? '다음 문제 생성 중...' : '다음 문제'}
          </button>
        </div>
      )}
    </div>
  )
}
