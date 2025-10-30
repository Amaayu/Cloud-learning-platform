"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@/components/code-block'

// Mock data - in real app, this would come from API
const topicData = {
  'arrays-strings': {
    'array-basics': {
      title: 'Array Basics',
      content: `
# Array Basics

Arrays are one of the most fundamental data structures in computer science. An array is a collection of elements stored at contiguous memory locations. The idea is to store multiple items of the same type together.

## Key Characteristics

- **Fixed Size**: Arrays have a fixed size that is determined at the time of creation
- **Homogeneous Elements**: All elements in an array are of the same data type
- **Random Access**: Elements can be accessed directly using their index
- **Zero-based Indexing**: Most programming languages use 0-based indexing

## Memory Layout

Arrays store elements in contiguous memory locations, which allows for efficient access patterns and cache performance.

## Time Complexity

- **Access**: O(1) - Direct access using index
- **Search**: O(n) - Linear search through elements
- **Insertion**: O(n) - May require shifting elements
- **Deletion**: O(n) - May require shifting elements

## Common Operations

1. **Traversal**: Visiting each element of the array
2. **Insertion**: Adding an element at a specific position
3. **Deletion**: Removing an element from a specific position
4. **Search**: Finding an element in the array
5. **Update**: Modifying an element at a specific position
      `,
      examples: [
        {
          title: 'Array Declaration and Initialization',
          description: 'Different ways to declare and initialize arrays in various programming languages.',
          code: `// JavaScript
let numbers = [1, 2, 3, 4, 5];
let fruits = new Array("apple", "banana", "orange");

// Java
int[] numbers = {1, 2, 3, 4, 5};
String[] fruits = new String[3];
fruits[0] = "apple";
fruits[1] = "banana";
fruits[2] = "orange";

// Python
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "orange"]

// C++
#include <array>
std::array<int, 5> numbers = {1, 2, 3, 4, 5};
std::string fruits[3] = {"apple", "banana", "orange"};`,
          language: 'javascript'
        },
        {
          title: 'Array Traversal',
          description: 'Different methods to iterate through array elements.',
          code: `// Using for loop
function printArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}

// Using for...of loop
function printArrayForOf(arr) {
    for (let element of arr) {
        console.log(element);
    }
}

// Using forEach method
function printArrayForEach(arr) {
    arr.forEach((element, index) => {
        console.log(\`Index \${index}: \${element}\`);
    });
}

// Example usage
let numbers = [10, 20, 30, 40, 50];
printArray(numbers);`,
          language: 'javascript'
        },
        {
          title: 'Array Search Operations',
          description: 'Linear search implementation to find elements in an array.',
          code: `// Linear Search
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Binary Search (for sorted arrays)
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Example usage
let numbers = [1, 3, 5, 7, 9, 11, 13];
console.log(linearSearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 7)); // Output: 3`,
          language: 'javascript'
        }
      ],
      order: 1,
    }
  }
}

export default function TopicPage() {
  const params = useParams()
  const { subjectId, unitId, topicId } = params
  const [topic, setTopic] = useState(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // In real app, fetch from API
    const topicInfo = topicData[unitId as string]?.[topicId as string]
    if (topicInfo) {
      setTopic(topicInfo)
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

    checkStatus()
  }, [subjectId, unitId, topicId])

  const handleBookmark = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to bookmark topics')
      return
    }

    setLoading(true)
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
      setLoading(false)
    }
  }

  const handleMarkComplete = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to track progress')
      return
    }

    setLoading(true)
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
      setLoading(false)
    }
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
              disabled={loading}
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
              disabled={loading}
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
                __html: topic.content.replace(/\n/g, '<br>').replace(/#{1,6} /g, match => {
                  const level = match.length - 1;
                  return `<h${level} class="text-${4-level}xl font-bold mt-6 mb-4">`;
                }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
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