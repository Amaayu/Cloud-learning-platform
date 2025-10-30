"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SetupPage() {
  const [seedStatus, setSeedStatus] = useState('')
  const [adminStatus, setAdminStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const seedDatabase = async () => {
    setLoading(true)
    setSeedStatus('Seeding database...')
    
    try {
      const response = await fetch('/api/seed', {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSeedStatus(`✅ Database seeded successfully! 
        - Subjects: ${data.counts.subjects}
        - Units: ${data.counts.units}
        - Topics: ${data.counts.topics}
        - Quizzes: ${data.counts.quizzes}`)
      } else {
        setSeedStatus(`❌ Seeding failed: ${data.message}`)
      }
    } catch (error) {
      setSeedStatus(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const createAdmin = async () => {
    setLoading(true)
    setAdminStatus('Creating admin user...')
    
    try {
      const response = await fetch('/api/create-admin', {
        method: 'POST'
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setAdminStatus(`✅ ${data.message}
        
        🔐 Admin Credentials:
        Email: ${data.email}
        Password: ${data.password}
        
        🌐 Login: ${data.loginUrl}
        📊 Dashboard: ${data.adminDashboard}`)
      } else {
        setAdminStatus(`❌ Failed: ${data.message}`)
      }
    } catch (error) {
      setAdminStatus(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">CSE Learning Platform Setup</h1>
        <p className="text-muted-foreground">
          Set up your MongoDB Atlas database with sample data and admin user
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seed Database */}
        <Card>
          <CardHeader>
            <CardTitle>1. Seed Database</CardTitle>
            <CardDescription>
              Populate your MongoDB Atlas database with sample subjects, units, topics, and quizzes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={seedDatabase} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Seeding...' : 'Seed Database'}
            </Button>
            
            {seedStatus && (
              <div className="p-4 bg-muted rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">{seedStatus}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Admin */}
        <Card>
          <CardHeader>
            <CardTitle>2. Create Admin User</CardTitle>
            <CardDescription>
              Create an admin user to manage the platform content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={createAdmin} 
              disabled={loading}
              className="w-full"
              variant="outline"
            >
              {loading ? 'Creating...' : 'Create Admin User'}
            </Button>
            
            {adminStatus && (
              <div className="p-4 bg-muted rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">{adminStatus}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              After seeding the database and creating admin user:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/">Go to Home Page</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/auth/login">Admin Login</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/subjects">Browse Subjects</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}