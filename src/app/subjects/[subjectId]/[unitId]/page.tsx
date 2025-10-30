"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Clock, CheckCircle, Circle, Play, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// Mock data - in real app, this would come from API
const unitData = {
  'arrays-strings': {
    title: 'Arrays and Strings',
    description: 'Learn about arrays, strings, and basic operations. Master the fundamental data structures that form the building blocks of more complex algorithms.',
    estimatedHours: 10,
    totalTopics: 8,
    topics: [
      {
        _id: 'array-basics',
        title: 'Array Basics',
        description: 'Introduction to arrays, memory layout, and basic operations',
        estimatedTime: '45 min',
        difficulty: 'Beginner',
        order: 1,
      },
      {
        _id: 'array-operations',
        title: 'Array Operations',
        description: 'Insertion, deletion, searching, and traversal operations',
        estimatedTime: '60 min',
        difficulty: 'Beginner',
        order: 2,
      },
      {
        _id: 'string-basics',
        title: 'String Fundamentals',
        description: 'String representation, operations, and common algorithms',
        estimatedTime: '50 min',
        difficulty: 'Beginner',
        order: 3,
      },
      {
        _id: 'string-algorithms',
        title: 'String Algorithms',
        description: 'Pattern matching, string manipulation, and advanced techniques',
        estimatedTime: '75 min',
        difficulty: 'Intermediate',
        order: 4,
      },
      {
        _id: 'two-pointers',
        title: 'Two Pointers Technique',
        description: 'Efficient array and string processing using two pointers',
        estimatedTime: '65 min',
        difficulty: 'Intermediate',
        order: 5,
      },
      {
        _id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Optimize subarray problems with sliding window technique',
        estimatedTime: '70 min',
        difficulty: 'Intermediate',
        order: 6,
      },
      {
        _id: 'array-problems',
        title: 'Common Array Problems',
        description: 'Practice with frequently asked array interview questions',
        estimatedTime: '90 min',
        difficulty: 'Advanced',
        order: 7,
      },
      {
        _id: 'string-problems',
        title: 'String Problem Solving',
        description: 'Advanced string manipulation and algorithm problems',
        estimatedTime: '85 min',
        difficulty: 'Advanced',
        order: 8,
      },
    ],
  },
}

export default function UnitPage() {
  const params = useParams()
  const { subjectId, unitId } = params
  const [unit, setUnit] = useState(null)
  const [completedTopics, setCompletedTopics] = useState<string[]>([])
  const [unitProgress, setUnitProgress] = useState(0)

  useEffect(() => {
    // In real app, fetch from API
    const unitInfo = unitData[unitId as string]
    if (unitInfo) {
      setUnit(unitInfo)
    }

    // Fetch user progress
    const fetchProgress = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch(`/api/units/${unitId}/progress`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            setCompletedTopics(data.completedTopics || [])
            setUnitProgress(data.progressPercentage || 0)
          }
        } catch (error) {
          console.error('Error fetching progress:', error)
        }
      }
    }

    fetchProgress()
  }, [subjectId, unitId])

  if (!unit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unit not found</h1>
          <Link href={`/subjects/${subjectId}`}>
            <Button>← Back to Subject</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'Advanced':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
    }
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
        <Link href={`/subjects/${subjectId}`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subject
          </Button>
        </Link>
      </motion.div>

      {/* Unit Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4">{unit.title}</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
            {unit.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{unit.topics.length}</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{completedTopics.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{unit.estimatedHours}h</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{unitProgress}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>

          {unitProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Unit Progress</span>
                <span>{unitProgress}%</span>
              </div>
              <Progress value={unitProgress} className="h-3" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Topics List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Topics</h2>
          <Link href={`/subjects/${subjectId}/${unitId}/quiz`}>
            <Button variant="outline">
              <Brain className="h-4 w-4 mr-2" />
              Take Unit Quiz
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {unit.topics.map((topic, index) => (
            <motion.div
              key={topic._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Link href={`/subjects/${subjectId}/${unitId}/${topic._id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                          {topic.order}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{topic.title}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                              {topic.difficulty}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {topic.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{topic.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {completedTopics.includes(topic._id) ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Completed</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <Circle className="h-5 w-5" />
                            <span className="text-sm">Not started</span>
                          </div>
                        )}
                        
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          {completedTopics.includes(topic._id) ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Unit Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12"
      >
        <Card>
          <CardHeader>
            <CardTitle>Unit Summary</CardTitle>
            <CardDescription>
              What you'll learn in this unit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Key Concepts</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Array data structure and memory layout</li>
                  <li>• String manipulation and algorithms</li>
                  <li>• Two pointers and sliding window techniques</li>
                  <li>• Common problem-solving patterns</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Skills You'll Gain</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Efficient array and string processing</li>
                  <li>• Algorithm optimization techniques</li>
                  <li>• Problem-solving with multiple approaches</li>
                  <li>• Interview preparation for array problems</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}