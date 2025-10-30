"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, BookOpen, Award, Clock, Bookmark, Settings, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [progress, setProgress] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
            setEditForm({
              name: userData.name,
              email: userData.email,
            })
            setBookmarks(userData.bookmarks || [])
            setProgress(userData.progress || [])
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchUserData()
  }, [])

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editForm)
        })
        
        if (response.ok) {
          const updatedUser = await response.json()
          setUser(updatedUser)
          setIsEditing(false)
        }
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  const totalTopicsCompleted = progress.reduce((total, subject) => 
    total + (subject.completedTopics?.length || 0), 0
  )

  const averageProgress = progress.length > 0 
    ? Math.round(progress.reduce((total, subject) => 
        total + (subject.progressPercentage || 0), 0) / progress.length)
    : 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Track your learning progress and manage your account
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleSaveProfile}>
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <p className="text-lg capitalize">{user.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                    <p className="text-lg">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Learning Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm">Topics Completed</span>
                </div>
                <span className="font-semibold">{totalTopicsCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm">Average Progress</span>
                </div>
                <span className="font-semibold">{averageProgress}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bookmark className="h-4 w-4 text-primary" />
                  <span className="text-sm">Bookmarks</span>
                </div>
                <span className="font-semibold">{bookmarks.length}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress and Bookmarks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>
                Your progress across all subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {progress.length > 0 ? (
                <div className="space-y-6">
                  {progress.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Subject {index + 1}</h3>
                        <span className="text-sm text-muted-foreground">
                          {subject.progressPercentage || 0}%
                        </span>
                      </div>
                      <Progress value={subject.progressPercentage || 0} className="h-2" />
                      <div className="text-sm text-muted-foreground">
                        {subject.completedTopics?.length || 0} topics completed
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Start learning to see your progress here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bookmarks */}
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Topics</CardTitle>
              <CardDescription>
                Topics you've saved for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookmarks.length > 0 ? (
                <div className="space-y-4">
                  {bookmarks.slice(0, 5).map((bookmark, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Bookmark {index + 1}</h3>
                        <p className="text-sm text-muted-foreground">
                          Saved topic
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                  {bookmarks.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center">
                      And {bookmarks.length - 5} more bookmarks...
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No bookmarks yet. Start bookmarking topics you want to revisit!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest learning activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed Array Basics</p>
                    <p className="text-xs text-muted-foreground">Data Structures & Algorithms - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Bookmarked Binary Search</p>
                    <p className="text-xs text-muted-foreground">Data Structures & Algorithms - 1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Started Arrays Unit</p>
                    <p className="text-xs text-muted-foreground">Data Structures & Algorithms - 2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}