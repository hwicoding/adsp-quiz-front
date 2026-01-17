import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as styles from './Exam.css'
import { Timer } from '../../components/Timer/Timer'
import { QuestionDisplay } from '../../components/QuestionDisplay/QuestionDisplay'
import { useStartExam, useSubmitExam } from '../../api/exam'
import { useExamStore } from '../../store/examStore'
import { useTimerStore } from '../../store/timerStore'

export const Exam = () => {
  const navigate = useNavigate()
  const { examSessionId, currentQuestionIndex, answers, startExam, addAnswer, resetExam } = useExamStore()
  const { seconds, isRunning, start, pause, resume, tick } = useTimerStore()
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  
  const startExamMutation = useStartExam()
  const submitExamMutation = useSubmitExam()

  useEffect(() => {
    if (!examSessionId && !startExamMutation.isPending && !startExamMutation.data) {
      startExamMutation.mutate(
        { questionCount: 50 },
        {
          onSuccess: (data) => {
            startExam(data.examSessionId)
            start(data.timeLimit)
          },
        }
      )
    }
  }, [examSessionId, startExamMutation.isPending, startExamMutation.data])

  useEffect(() => {
    if (!isRunning || seconds <= 0) return

    const interval = window.setInterval(() => {
      tick()
      const currentSeconds = useTimerStore.getState().seconds
      if (currentSeconds <= 0) {
        handleTimeUp()
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isRunning, seconds])

  const handlePause = () => {
    pause()
  }

  const handleResume = () => {
    resume()
  }

  const handleTimeUp = () => {
    handleSubmit()
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (startExamMutation.data && selectedAnswer !== undefined) {
      const currentQuiz = startExamMutation.data.quizzes[currentQuizIndex]
      if (currentQuiz) {
        const isCorrect = currentQuiz.correctAnswer === selectedAnswer
        addAnswer(currentQuiz.id, selectedAnswer, isCorrect)
      }
      
      if (currentQuizIndex < startExamMutation.data.quizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1)
        setSelectedAnswer(undefined)
      }
    }
  }

  const handleSubmit = () => {
    if (!examSessionId || !startExamMutation.data) return

    const allAnswers = startExamMutation.data.quizzes.map((quiz, index) => {
      const answer = answers.find((a) => a.quizId === quiz.id)
      return {
        quizId: quiz.id,
        selectedAnswer: answer?.selectedAnswer ?? -1,
      }
    })

    submitExamMutation.mutate(
      {
        examSessionId,
        answers: allAnswers,
      },
      {
        onSuccess: () => {
          resetExam()
          navigate(`/exam/result/${examSessionId}`)
        },
      }
    )
  }

  if (startExamMutation.isPending) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>시험 준비 중...</div>
      </div>
    )
  }

  if (startExamMutation.isError) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          시험 시작 중 오류가 발생했습니다.
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </div>
      </div>
    )
  }

  if (!startExamMutation.data) {
    return null
  }

  const currentQuiz = startExamMutation.data.quizzes[currentQuizIndex]
  const totalQuestions = startExamMutation.data.quizzes.length
  const progress = ((currentQuizIndex + 1) / totalQuestions) * 100

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>모의고사</h1>
        <div className={styles.timerWrapper}>
          <Timer
            seconds={seconds}
            isRunning={isRunning}
            onPause={handlePause}
            onResume={handleResume}
            onTimeUp={handleTimeUp}
          />
        </div>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <span>문제 {currentQuizIndex + 1} / {totalQuestions}</span>
          <span>남은 시간: {Math.floor(seconds / 60)}분</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.content}>
        {currentQuiz && (
          <QuestionDisplay
            quiz={currentQuiz}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
        )}
      </div>

      <div className={styles.footer}>
        {currentQuizIndex < totalQuestions - 1 ? (
          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={selectedAnswer === undefined}
          >
            다음 문제
          </button>
        ) : (
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={submitExamMutation.isPending}
          >
            {submitExamMutation.isPending ? '제출 중...' : '시험 제출'}
          </button>
        )}
      </div>
    </div>
  )
}
