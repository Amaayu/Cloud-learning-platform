"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuizComponent from '@/components/quiz-component'

// Mock quiz data - in real app, this would come from API
const quizData = {
  'arrays-strings': {
    title: 'Arrays and Strings Quiz',
    timeLimit: 20,
    questions: [
      {
        id: 'q1',
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Array elements can be accessed directly using their index, which takes constant time O(1).'
      },
      {
        id: 'q2',
        question: 'Which of the following is NOT a characteristic of arrays?',
        options: [
          'Elements are stored in contiguous memory locations',
          'All elements must be of the same data type',
          'Dynamic size that can change during runtime',
          'Zero-based indexing in most programming languages'
        ],
        correctAnswer: 2,
        explanation: 'Arrays typically have a fixed size that is determined at creation time. Dynamic arrays or lists can change size, but traditional arrays cannot.'
      },
      {
        id: 'q3',
        question: 'What is the worst-case time complexity for searching an element in an unsorted array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 2,
        explanation: 'In the worst case, we might need to check every element in the array, resulting in O(n) time complexity.'
      },
      {
        id: 'q4',
        question: 'Which string operation typically has O(n) time complexity where n is the length of the string?',
        options: [
          'Accessing a character by index',
          'Finding the length of the string',
          'Concatenating two strings',
          'Comparing two characters'
        ],
        correctAnswer: 2,
        explanation: 'String concatenation typically requires creating a new string and copying all characters, which takes O(n) time.'
      },
      {
        id: 'q5',
        question: 'In the two pointers technique, what is the typical starting position of the pointers?',
        options: [
          'Both at the beginning',
          'Both at the end',
          'One at the beginning, one at the end',
          'One at the middle, one at the end'
        ],
        correctAnswer: 2,
        explanation: 'The two pointers technique typically starts with one pointer at the beginning and one at the end of the array, then moves them towards each other.'
      },
      {
        id: 'q6',
        question: 'What is the main advantage of the sliding window technique?',
        options: [
          'It uses less memory',
          'It reduces time complexity from O(n²) to O(n)',
          'It works only with sorted arrays',
          'It can handle negative numbers'
        ],
        correctAnswer: 1,
        explanation: 'The sliding window technique optimizes problems by avoiding redundant calculations, often reducing time complexity from O(n²) to O(n).'
      },
      {
        id: 'q7',
        question: 'Which of the following is the correct way to declare an array in JavaScript?',
        options: [
          'let arr = array[5];',
          'let arr = new Array(5);',
          'let arr = Array<5>;',
          'let arr = [5]array;'
        ],
        correctAnswer: 1,
        explanation: 'In JavaScript, you can declare an array using "new Array(size)" or array literal notation like "let arr = []".'
      },
      {
        id: 'q8',
        question: 'What happens when you try to access an array element beyond its bounds in most programming languages?',
        options: [
          'Returns null',
          'Returns undefined or throws an error',
          'Returns the last element',
          'Automatically extends the array'
        ],
        correctAnswer: 1,
        explanation: 'Accessing an array beyond its bounds typically returns undefined (JavaScript) or throws an error (Java, C++), depending on the language.'
      }
    ]
  }
}

export default function QuizPage() {
  const params = useParams()
  const { subjectId, unitId } = params
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const quiz = quizData[unitId as string]

  const handleQuizComplete = async (score: number, answers: Record<string, number>) => {
    setQuizScore(score)
    setQuizCompleted(true)

    // Save quiz results to backend
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await fetch(`/api/quiz/${unitId}/submit`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subjectId,
            unitId,
            score,
            answers,
            totalQuestions: quiz.questions.length
          })
        })
      } catch (error) {
        console.error('Error saving quiz results:', error)
      }
    }
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
          <Link href={`/subjects/${subjectId}/${unitId}`}>
            <Button>← Back to Unit</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Link href={`/subjects/${subjectId}/${unitId}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Unit
          </Button>
        </Link>
      </motion.div>

      {/* Quiz Component */}
      <QuizComponent
        questions={quiz.questions}
        title={quiz.title}
        timeLimit={quiz.timeLimit}
        onComplete={handleQuizComplete}
      />

      {/* Post-Quiz Actions */}
      {quizCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/subjects/${subjectId}/${unitId}`}>
              <Button variant="outline">
                Back to Unit
              </Button>
            </Link>
            <Link href={`/subjects/${subjectId}`}>
              <Button>
                Continue Learning
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}