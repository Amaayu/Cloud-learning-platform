"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Clock, CheckCircle, Circle, Play, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Topic {
  _id: string
  title: string
  description: string
  estimatedTime?: string
  difficulty?: string
  order: number
}

interface Unit {
  _id: string
  title: string
  description: string
  topics: Topic[]
  subject?: {
    _id: string
    title: string
  }
}

export default function UnitPage() {
  const params = useParams()
  const { subjectId, unitId } = params
  const [unit, setUnit] = useState<Unit | null>(null)
  const [loading, setLoading] = useState(true)
  const [completedTopics, setCompletedTopics] = useState<string[]>([])
  const [unitProgress, setUnitProgress] = useState(0)

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/units/${unitId}`)
        if (response.ok) {
          const data = await response.json()
          setUnit(data)
        } else {
          console.error('Failed to fetch unit')
        }
      } catch (error) {
        console.error('Error fetching unit:', error)
      } finally {
        setLoading(false)
      }
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

    if (unitId) {
      fetchUnit()
      fetchProgress()
    }
  }, [subjectId, unitId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading unit...</p>
        </div>
      </div>
    )
  }

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
              <div className="text-2xl font-bold text-primary">{unit.topics?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{completedTopics.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">8h</div>
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
          {unit.topics?.map((topic, index) => (
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
                            {topic.difficulty && (
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                                {topic.difficulty}
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {topic.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{topic.estimatedTime || '30 min'}</span>
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