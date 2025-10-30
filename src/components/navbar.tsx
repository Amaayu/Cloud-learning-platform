"use client"

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, User, BookOpen, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setMounted(true)
    // Check for user session
    const token = localStorage.getItem('token')
    if (token) {
      // Fetch user data
      fetchUser(token)
    }
  }, [])

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/'
  }

  if (!mounted) return null

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">CSE Learn</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/subjects" className="text-sm font-medium hover:text-primary transition-colors">
              Subjects
            </Link>
            
            {user ? (
              <>
                <Link href="/profile" className="text-sm font-medium hover:text-primary transition-colors">
                  Profile
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}