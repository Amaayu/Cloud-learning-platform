import Link from 'next/link'
import { BookOpen, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">CSE Learn</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Comprehensive learning platform for B.Tech Computer Science Engineering students.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-4">
            <h3 className="font-semibold">Subjects</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/subjects/dsa" className="text-muted-foreground hover:text-primary transition-colors">
                  Data Structures & Algorithms
                </Link>
              </li>
              <li>
                <Link href="/subjects/dbms" className="text-muted-foreground hover:text-primary transition-colors">
                  Database Management
                </Link>
              </li>
              <li>
                <Link href="/subjects/os" className="text-muted-foreground hover:text-primary transition-colors">
                  Operating Systems
                </Link>
              </li>
              <li>
                <Link href="/subjects/cn" className="text-muted-foreground hover:text-primary transition-colors">
                  Computer Networks
                </Link>
              </li>
              <li>
                <Link href="/subjects/web-dev" className="text-muted-foreground hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/subjects/ai-ml" className="text-muted-foreground hover:text-primary transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/subjects" className="text-muted-foreground hover:text-primary transition-colors">
                  All Subjects
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  My Progress
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Study Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Practice Problems
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Interview Prep
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CSE Learn. All rights reserved. Built with ❤️ for Computer Science students.</p>
        </div>
      </div>
    </footer>
  )
}