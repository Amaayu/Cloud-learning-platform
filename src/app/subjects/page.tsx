"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, BookOpen, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// Subjects will be fetched from API

import { Subject } from '@/types'

export default function SubjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([])
  const [userProgress, setUserProgress] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch subjects from API
    const fetchSubjects = async () => {
      try {
        const response = await fetch('/api/subjects')
        if (response.ok) {
          const data = await response.json()
          setSubjects(data)
          setFilteredSubjects(data)
        }
      } catch (error) {
        console.error('Error fetching subjects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [])

  useEffect(() => {
    let filtered = subjects

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(subject => subject.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(subject =>
        subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredSubjects(filtered)
  }, [searchTerm, selectedCategory, subjects])

  useEffect(() => {
    // Fetch user progress
    const fetchProgress = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch('/api/user/progress', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            setUserProgress(data.progress)
          }
        } catch (error) {
          console.error('Error fetching progress:', error)
        }
      }
    }

    fetchProgress()
  }, [])

  const categories = [
    { id: 'all', label: 'All Subjects' },
    { id: 'core', label: 'Core Subjects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai-ml', label: 'AI/ML' },
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading subjects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Computer Science Subjects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore comprehensive courses designed for B.Tech CSE students. 
          Each subject includes detailed theory, examples, and practical exercises.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Subjects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredSubjects.map((subject, index) => (
          <motion.div
            key={subject._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={`/subjects/${subject._id}`}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary" />
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl line-clamp-2">{subject.title}</CardTitle>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {subject.category}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {subject.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  {userProgress[subject._id] !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{userProgress[subject._id]}%</span>
                      </div>
                      <Progress value={userProgress[subject._id]} className="h-2" />
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{subject.units?.length || 0} units</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>~{Math.ceil((subject.units?.length || 0) * 8)}h</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    Start Learning →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredSubjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No subjects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse all subjects.
          </p>
        </motion.div>
      )}
    </div>
  )
}