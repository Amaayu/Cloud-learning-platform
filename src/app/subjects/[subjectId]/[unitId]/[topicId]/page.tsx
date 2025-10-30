"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@/components/code-block'

interface Example {
  _id?: string
  title: string
  description: string
  code: string
  language: string
}

interface Topic {
  _id: string
  title: string
  content: string
  examples: Example[]
  order: number
  unit?: {
    _id: string
    title: string
  }
  subject?: {
    _id: string
    title: string
  }
}

export default function TopicPage() {
  const params = useParams()
  const { subjectId, unitId, topicId } = params
  const [topic, setTopic] = useState<Topic | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/topics/${topicId}`)
        if (response.ok) {
          const data = await response.json()
          setTopic(data)
        } else {
          console.error('Failed to fetch topic')
        }
      } catch (error) {
        console.error('Error fetching topic:', error)
      } finally {
        setLoading(false)
      }
    }

    // Check if topic is bookmarked and completed
    const checkStatus = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch(`/api/topics/${topicId}/status`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            setIsBookmarked(data.isBookmarked)
            setIsCompleted(data.isCompleted)
          }
        } catch (error) {
          console.error('Error fetching topic status:', error)
        }
      }
    }

    if (topicId) {
      fetchTopic()
      checkStatus()
    }
  }, [subjectId, unitId, topicId])

  const handleBookmark = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to bookmark topics')
      return
    }

    setActionLoading(true)
    try {
      const response = await fetch(`/api/topics/${topicId}/bookmark`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: isBookmarked ? 'remove' : 'add' })
      })

      if (response.ok) {
        setIsBookmarked(!isBookmarked)
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    } finally {
      setActionLoading(false)
    }
  }

  const handleMarkComplete = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to track progress')
      return
    }

    setActionLoading(true)
    try {
      const response = await fetch(`/api/topics/${topicId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          subjectId,
          unitId,
          completed: !isCompleted 
        })
      })

      if (response.ok) {
        setIsCompleted(!isCompleted)
      }
    } catch (error) {
      console.error('Error updating completion status:', error)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading topic...</p>
        </div>
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
          <Link href={`/subjects/${subjectId}`}>
            <Button>← Back to Subject</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation */}
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

      {/* Topic Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl font-bold">{topic.title}</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmark}
              disabled={actionLoading}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 mr-2" />
              ) : (
                <Bookmark className="h-4 w-4 mr-2" />
              )}
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={handleMarkComplete}
              disabled={actionLoading}
            >
              {isCompleted ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <Circle className="h-4 w-4 mr-2" />
              )}
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Topic Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-8">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: topic.content
                  .replace(/\n/g, '<br>')
                  .replace(/#{6}\s+(.*)/g, '<h6 class="text-sm font-bold mt-4 mb-2">$1</h6>')
                  .replace(/#{5}\s+(.*)/g, '<h5 class="text-base font-bold mt-4 mb-2">$1</h5>')
                  .replace(/#{4}\s+(.*)/g, '<h4 class="text-lg font-bold mt-4 mb-3">$1</h4>')
                  .replace(/#{3}\s+(.*)/g, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
                  .replace(/#{2}\s+(.*)/g, '<h2 class="text-2xl font-bold mt-6 mb-4">$1</h2>')
                  .replace(/#{1}\s+(.*)/g, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
              }}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Code Examples */}
      {topic.examples && topic.examples.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
          <div className="space-y-6">
            {topic.examples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={example.code}
                    language={example.language}
                    title={example.title}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Navigation Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex justify-between items-center pt-8 border-t"
      >
        <Button variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Topic
        </Button>
        <Button>
          Next Topic
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}