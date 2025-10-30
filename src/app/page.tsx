"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Code, Database, Cpu, Network, Brain, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react'

const iconMap = {
  'core': Code,
  'frontend': BookOpen,
  'backend': Database,
  'ai-ml': Brain,
}

const colorMap = {
  'core': 'bg-blue-500',
  'frontend': 'bg-pink-500', 
  'backend': 'bg-green-500',
  'ai-ml': 'bg-indigo-500',
}

import { Subject } from '@/types'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
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

  const categories = [
    { id: 'all', label: 'All Subjects' },
    { id: 'core', label: 'Core Subjects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'ai-ml', label: 'AI/ML' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          CSE Learning Platform
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Master Computer Science Engineering with our comprehensive learning platform. 
          From Data Structures to AI/ML, we've got you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/subjects">
            <Button size="lg" className="w-full sm:w-auto">
              Start Learning
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
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
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          filteredSubjects.map((subject, index) => {
            const IconComponent = iconMap[subject.category] || Code
            const colorClass = colorMap[subject.category] || 'bg-blue-500'
            
            return (
              <motion.div
                key={subject._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/subjects/${subject._id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center mb-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{subject.title}</CardTitle>
                      <CardDescription>{subject.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground capitalize">
                          {subject.category}
                        </span>
                        <Button variant="ghost" size="sm">
                          Explore →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })
        )}
      </motion.div>

      {filteredSubjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">No subjects found matching your criteria.</p>
        </motion.div>
      )}

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-8">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
            <p className="text-muted-foreground">
              Detailed explanations, examples, and code snippets for every topic
            </p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
            <p className="text-muted-foreground">
              Practice with quizzes and track your progress through each subject
            </p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Modern Approach</h3>
            <p className="text-muted-foreground">
              Learn with the latest industry practices and real-world examples
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
