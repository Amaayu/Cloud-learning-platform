"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Clock, Users, CheckCircle, Circle, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// Subject data will be fetched from API

import { Subject } from '@/types'

export default function SubjectDetailPage() {
  const params = useParams()
  const subjectId = params.subjectId as string
  const [subject, setSubject] = useState<Subject | null>(null)
  const [userProgress, setUserProgress] = useState<Record<string, number>>({})
  const [completedUnits, setCompletedUnits] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch subject from API
    const fetchSubject = async () => {
      try {
        const response = await fetch(`/api/subjects/${subjectId}`)
        if (response.ok) {
          const data = await response.json()
          setSubject(data)
        }
      } catch (error) {
        console.error('Error fetching subject:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubject()

    // Fetch user progress
    const fetchProgress = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch(`/api/subjects/${subjectId}/progress`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            setUserProgress(data.unitProgress || {})
            setCompletedUnits(data.completedUnits || [])
          }
        } catch (error) {
          console.error('Error fetching progress:', error)
        }
      }
    }

    fetchProgress()
  }, [subjectId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading subject...</p>
        </div>
      </div>
    )
  }

  if (!subject) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
          <Link href="/subjects">
            <Button>← Back to Subjects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const overallProgress = Object.values(userProgress).length > 0 
    ? Math.round(Object.values(userProgress).reduce((a, b) => a + b, 0) / Object.values(userProgress).length)
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Link href="/subjects">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Subjects
          </Button>
        </Link>
      </motion.div>

      {/* Subject Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4">{subject.title}</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
            {subject.description}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{subject.units?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Units</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {subject.units?.reduce((total, unit) => total + (unit.topics?.length || 0), 0) || 0}
              </div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">~{Math.ceil((subject.units?.length || 0) * 8)}h</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>

          {overallProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Units Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Course Units</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subject.units?.map((unit, index) => (
            <motion.div
              key={unit._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/subjects/${subjectId}/${unit._id.toString()}`}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                          {unit.order}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{unit.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {unit.description}
                          </CardDescription>
                        </div>
                      </div>
                      {completedUnits.includes(unit._id) ? (
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    {userProgress[unit._id] !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{userProgress[unit._id]}%</span>
                        </div>
                        <Progress value={userProgress[unit._id]} className="h-2" />
                      </div>
                    )}

                    {/* Unit Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{unit.topics?.length || 0} topics</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>~{Math.ceil((unit.topics?.length || 0) * 1.5)}h</span>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      {userProgress[unit._id] > 0 ? 'Continue' : 'Start Unit'}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <h3 className="text-xl font-semibold mb-4">Ready to start learning?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {subject.units && subject.units.length > 0 && (
            <Link href={`/subjects/${subjectId}/${subject.units[0]._id}`}>
              <Button size="lg">
                Start from Unit 1
              </Button>
            </Link>
          )}
          <Link href={`/subjects/${subjectId}/quiz`}>
            <Button variant="outline" size="lg">
              Take Practice Quiz
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}