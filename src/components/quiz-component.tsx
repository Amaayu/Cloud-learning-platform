"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface QuizComponentProps {
  questions: Question[]
  title: string
  timeLimit?: number
  onComplete: (score: number, answers: Record<string, number>) => void
}

export default function QuizComponent({ questions, title, timeLimit = 30, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60) // Convert to seconds
  const [quizStarted, setQuizStarted] = useState(false)

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    const score = calculateScore()
    setShowResults(true)
    onComplete(score, answers)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>
              Test your knowledge with this quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{questions.length}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{timeLimit}</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">MCQ</div>
                <div className="text-sm text-muted-foreground">Format</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Instructions:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Choose the best answer for each question</li>
                <li>• You can navigate between questions</li>
                <li>• Submit when you're ready or when time runs out</li>
                <li>• You'll see your results immediately after submission</li>
              </ul>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer).length

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Results Summary */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
              <Award className="h-6 w-6 text-primary" />
              <span>Quiz Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
              <p className="text-muted-foreground">
                You got {correctAnswers} out of {questions.length} questions correct
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-green-600">Correct</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{questions.length - correctAnswers}</div>
                <div className="text-sm text-red-600">Incorrect</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{score >= 70 ? 'Pass' : 'Fail'}</div>
                <div className="text-sm text-blue-600">Result</div>
              </div>
            </div>

            <Progress value={score} className="h-3 mb-4" />
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
            <CardDescription>
              Review your answers and explanations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = userAnswer === question.correctAnswer

              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                                : 'bg-muted/50'
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                            {optionIndex === question.correctAnswer && (
                              <span className="ml-2 font-medium">(Correct)</span>
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <span className="ml-2 font-medium">(Your answer)</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {question.explanation && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      {/* Quiz Header */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQ.id, index)}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  answers[currentQ.id] === index
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined}
            >
              {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}