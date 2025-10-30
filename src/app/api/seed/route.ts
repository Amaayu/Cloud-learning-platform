import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import mongoose from 'mongoose'

export async function POST() {
  try {
    await dbConnect()

    // Clear existing data
    await mongoose.connection.db.collection('subjects').deleteMany({})
    await mongoose.connection.db.collection('units').deleteMany({})
    await mongoose.connection.db.collection('topics').deleteMany({})
    await mongoose.connection.db.collection('quizzes').deleteMany({})

    // Complete subjects data
    const subjects = [
      {
        title: 'Data Structures & Algorithms',
        description: 'Master fundamental data structures and algorithmic thinking with comprehensive examples and practice problems.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
        category: 'core',
        units: []
      },
      {
        title: 'Database Management System',
        description: 'Learn database design, SQL queries, normalization, and database management concepts.',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
        category: 'core',
        units: []
      },
      {
        title: 'Operating Systems',
        description: 'Understand OS concepts, processes, memory management, and system calls.',
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400',
        category: 'core',
        units: []
      },
      {
        title: 'Computer Networks',
        description: 'Explore networking protocols, OSI model, TCP/IP, and network security.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
        category: 'core',
        units: []
      },
      {
        title: 'Web Development',
        description: 'Build modern web applications with HTML, CSS, JavaScript, and popular frameworks.',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400',
        category: 'frontend',
        units: []
      },
      {
        title: 'AI & Machine Learning',
        description: 'Introduction to artificial intelligence, machine learning algorithms, and neural networks.',
        image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
        category: 'ai-ml',
        units: []
      }
    ]

    // Insert subjects
    const insertedSubjects = await mongoose.connection.db.collection('subjects').insertMany(subjects)
    const subjectIds = Object.values(insertedSubjects.insertedIds)

    // Comprehensive units data for all subjects
    const units = [
      // Data Structures & Algorithms Units
      {
        title: 'Arrays and Strings',
        description: 'Fundamental linear data structures for storing and manipulating data',
        subjectId: subjectIds[0],
        topics: [],
        order: 1
      },
      {
        title: 'Linked Lists',
        description: 'Dynamic data structures with pointer-based connections',
        subjectId: subjectIds[0],
        topics: [],
        order: 2
      },
      {
        title: 'Stacks and Queues',
        description: 'LIFO and FIFO data structures with specific access patterns',
        subjectId: subjectIds[0],
        topics: [],
        order: 3
      },
      {
        title: 'Trees and Binary Trees',
        description: 'Hierarchical data structures for efficient searching and sorting',
        subjectId: subjectIds[0],
        topics: [],
        order: 4
      },
      {
        title: 'Graphs',
        description: 'Network structures representing relationships between entities',
        subjectId: subjectIds[0],
        topics: [],
        order: 5
      },
      {
        title: 'Dynamic Programming',
        description: 'Optimization technique for solving complex problems efficiently',
        subjectId: subjectIds[0],
        topics: [],
        order: 6
      },
      
      // Database Management System Units
      {
        title: 'Introduction to DBMS',
        description: 'Database concepts, architecture, and data models',
        subjectId: subjectIds[1],
        topics: [],
        order: 1
      },
      {
        title: 'Entity-Relationship Model',
        description: 'Conceptual database design using ER diagrams',
        subjectId: subjectIds[1],
        topics: [],
        order: 2
      },
      {
        title: 'Relational Model',
        description: 'Mathematical foundation of relational databases',
        subjectId: subjectIds[1],
        topics: [],
        order: 3
      },
      {
        title: 'SQL Fundamentals',
        description: 'Structured Query Language for database operations',
        subjectId: subjectIds[1],
        topics: [],
        order: 4
      },
      {
        title: 'Normalization',
        description: 'Database design principles to eliminate redundancy',
        subjectId: subjectIds[1],
        topics: [],
        order: 5
      },
      {
        title: 'Transaction Management',
        description: 'ACID properties and concurrency control',
        subjectId: subjectIds[1],
        topics: [],
        order: 6
      },
      
      // Operating Systems Units
      {
        title: 'OS Introduction',
        description: 'Operating system concepts and system architecture',
        subjectId: subjectIds[2],
        topics: [],
        order: 1
      },
      {
        title: 'Process Management',
        description: 'Process creation, scheduling, and synchronization',
        subjectId: subjectIds[2],
        topics: [],
        order: 2
      },
      {
        title: 'Memory Management',
        description: 'Virtual memory, paging, and memory allocation',
        subjectId: subjectIds[2],
        topics: [],
        order: 3
      },
      {
        title: 'File Systems',
        description: 'File organization, directory structures, and storage',
        subjectId: subjectIds[2],
        topics: [],
        order: 4
      },
      {
        title: 'I/O Management',
        description: 'Device drivers, interrupt handling, and I/O scheduling',
        subjectId: subjectIds[2],
        topics: [],
        order: 5
      },
      {
        title: 'Security and Protection',
        description: 'Access control, authentication, and system security',
        subjectId: subjectIds[2],
        topics: [],
        order: 6
      }
    ]

    // Insert units
    const insertedUnits = await mongoose.connection.db.collection('units').insertMany(units)
    const unitIds = Object.values(insertedUnits.insertedIds)

    // Add units for remaining subjects
    const additionalUnits = [
      // Computer Networks Units
      {
        title: 'Network Fundamentals',
        description: 'Basic networking concepts and network types',
        subjectId: subjectIds[3],
        topics: [],
        order: 1
      },
      {
        title: 'OSI and TCP/IP Models',
        description: 'Network protocol stack and layer architecture',
        subjectId: subjectIds[3],
        topics: [],
        order: 2
      },
      {
        title: 'Data Link Layer',
        description: 'Frame transmission, error detection, and MAC protocols',
        subjectId: subjectIds[3],
        topics: [],
        order: 3
      },
      
      // Web Development Units
      {
        title: 'HTML & CSS Fundamentals',
        description: 'Structure and styling of web pages',
        subjectId: subjectIds[4],
        topics: [],
        order: 1
      },
      {
        title: 'JavaScript Basics',
        description: 'Client-side scripting and DOM manipulation',
        subjectId: subjectIds[4],
        topics: [],
        order: 2
      },
      {
        title: 'Frontend Frameworks',
        description: 'React, Vue, and modern frontend development',
        subjectId: subjectIds[4],
        topics: [],
        order: 3
      },
      
      // AI & Machine Learning Units
      {
        title: 'AI Introduction',
        description: 'Artificial intelligence concepts and applications',
        subjectId: subjectIds[5],
        topics: [],
        order: 1
      },
      {
        title: 'Machine Learning Basics',
        description: 'Supervised, unsupervised, and reinforcement learning',
        subjectId: subjectIds[5],
        topics: [],
        order: 2
      },
      {
        title: 'Neural Networks',
        description: 'Deep learning and artificial neural networks',
        subjectId: subjectIds[5],
        topics: [],
        order: 3
      }
    ]

    // Insert additional units
    const additionalInsertedUnits = await mongoose.connection.db.collection('units').insertMany(additionalUnits)
    const additionalUnitIds = Object.values(additionalInsertedUnits.insertedIds)
    
    // Combine all unit IDs
    const allUnitIds = [...unitIds, ...additionalUnitIds]

    // Update subjects with unit references
    await mongoose.connection.db.collection('subjects').updateOne(
      { _id: subjectIds[0] },
      { $set: { units: [unitIds[0], unitIds[1], unitIds[2], unitIds[3], unitIds[4], unitIds[5]] } }
    )
    await mongoose.connection.db.collection('subjects').updateOne(
      { _id: subjectIds[1] },
      { $set: { units: [unitIds[6], unitIds[7], unitIds[8], unitIds[9], unitIds[10], unitIds[11]] } }
    )
    await mongoose.connection.db.collection('subjects').updateOne(
      { _id: subjectIds[2] },
      { $set: { units: [unitIds[12], unitIds[13], unitIds[14], unitIds[15], unitIds[16], unitIds[17]] } }
    )
    await mongoose.connection.db.collection('subjects').updateOne(
      { _id: subjectIds[3] },
      { $set: { units: [additionalUnitIds[0], additionalUnitIds[1], additionalUnitIds[2]] } }
    )
    await mongoose.connection.db.collection('subjects').updateOne(
      { _id: subjectIds[4] },
      { $set: { units: [additionalUnitIds[3], additionalUnitIds[4], additionalUnitIds[5]] } }
    )
    await mongoose.connection.db.collection('subjects').updateOne(
      { _id: subjectIds[5] },
      { $set: { units: [additionalUnitIds[6], additionalUnitIds[7], additionalUnitIds[8]] } }
    )

    // Comprehensive topics for multiple units
    const topics = [
      // DSA Topics
      {
        title: 'Array Fundamentals',
        content: `<h1>Array Fundamentals</h1>
        <p>Arrays are fundamental data structures that store elements of the same type in contiguous memory locations.</p>
        <h2>Key Characteristics</h2>
        <ul>
          <li><strong>Contiguous Memory Layout</strong>: Elements are stored in consecutive memory addresses</li>
          <li><strong>Fixed Size</strong>: Size is determined at declaration time</li>
          <li><strong>Homogeneous Elements</strong>: All elements must be of the same data type</li>
          <li><strong>Zero-based Indexing</strong>: First element is at index 0</li>
        </ul>
        <h2>Time Complexity</h2>
        <ul>
          <li><strong>Access</strong>: O(1) - Direct access using index</li>
          <li><strong>Search</strong>: O(n) - Linear search through elements</li>
          <li><strong>Insertion</strong>: O(n) - May require shifting elements</li>
          <li><strong>Deletion</strong>: O(n) - May require shifting elements</li>
        </ul>`,
        examples: [
          {
            title: 'Array Declaration and Initialization',
            description: 'Different ways to declare and initialize arrays',
            code: `// JavaScript
let numbers = [1, 2, 3, 4, 5];
let fruits = new Array("apple", "banana", "orange");

// Java
int[] numbers = {1, 2, 3, 4, 5};
String[] fruits = new String[3];

// Python
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "orange"]`,
            language: 'javascript'
          }
        ],
        unitId: unitIds[0],
        subjectId: subjectIds[0],
        order: 1
      },
      {
        title: 'Array Operations and Algorithms',
        content: `<h1>Array Operations and Algorithms</h1>
        <p>Learn essential array operations including traversal, searching, insertion, and deletion.</p>
        <h2>Common Operations</h2>
        <ul>
          <li><strong>Traversal</strong>: Visiting each element exactly once</li>
          <li><strong>Insertion</strong>: Adding elements at specific positions</li>
          <li><strong>Deletion</strong>: Removing elements from specific positions</li>
          <li><strong>Searching</strong>: Finding elements or their positions</li>
        </ul>`,
        examples: [
          {
            title: 'Linear Search Implementation',
            description: 'Basic search algorithm for arrays',
            code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(linearSearch(numbers, 22)); // Output: 4`,
            language: 'javascript'
          }
        ],
        unitId: unitIds[0],
        subjectId: subjectIds[0],
        order: 2
      },
      
      // Linked List Topics
      {
        title: 'Linked List Fundamentals',
        content: `<h1>Linked List Fundamentals</h1>
        <p>A linked list is a linear data structure where elements are stored in nodes, and each node contains data and a reference to the next node.</p>
        <h2>Advantages</h2>
        <ul>
          <li><strong>Dynamic Size</strong>: Can grow or shrink during runtime</li>
          <li><strong>Efficient Insertion/Deletion</strong>: O(1) at known positions</li>
          <li><strong>Memory Efficient</strong>: Allocates memory as needed</li>
        </ul>`,
        examples: [
          {
            title: 'Singly Linked List Implementation',
            description: 'Basic linked list structure and operations',
            code: `class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    insertAtBeginning(data) {
        const newNode = new ListNode(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
}`,
            language: 'javascript'
          }
        ],
        unitId: unitIds[1],
        subjectId: subjectIds[0],
        order: 1
      },
      
      // DBMS Topics
      {
        title: 'Database Concepts and Architecture',
        content: `<h1>Database Concepts and Architecture</h1>
        <p>A database is an organized collection of structured information, or data, typically stored electronically in a computer system.</p>
        <h2>Key Database Concepts</h2>
        <ul>
          <li><strong>Data</strong>: Raw facts and figures</li>
          <li><strong>Database</strong>: Collection of related data</li>
          <li><strong>DBMS</strong>: Software system that enables users to define, create, maintain, and control access to databases</li>
        </ul>
        <h2>Three-Level Architecture</h2>
        <ul>
          <li><strong>External Level</strong>: User view of the database</li>
          <li><strong>Conceptual Level</strong>: Community view of the database</li>
          <li><strong>Internal Level</strong>: Physical storage of data</li>
        </ul>`,
        examples: [
          {
            title: 'Basic SQL Query',
            description: 'Simple SELECT statement',
            code: `-- Select all columns from users table
SELECT * FROM users;

-- Select specific columns with condition
SELECT name, email FROM users WHERE age > 18;

-- Select with ordering
SELECT * FROM users ORDER BY name ASC;`,
            language: 'sql'
          }
        ],
        unitId: unitIds[6],
        subjectId: subjectIds[1],
        order: 1
      },
      
      // OS Topics
      {
        title: 'Operating System Fundamentals',
        content: `<h1>Operating System Fundamentals</h1>
        <p>An Operating System (OS) is system software that manages computer hardware and software resources and provides common services for computer programs.</p>
        <h2>Functions of Operating System</h2>
        <ul>
          <li><strong>Process Management</strong>: Process creation, scheduling, and synchronization</li>
          <li><strong>Memory Management</strong>: Memory allocation and virtual memory</li>
          <li><strong>File System Management</strong>: File operations and storage</li>
          <li><strong>I/O System Management</strong>: Device driver management</li>
        </ul>`,
        examples: [
          {
            title: 'System Call Example',
            description: 'Basic system calls in C',
            code: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();
    
    if (pid == 0) {
        // Child process
        printf("Child process: PID = %d\\n", getpid());
        exit(0);
    } else if (pid > 0) {
        // Parent process
        printf("Parent process: PID = %d\\n", getpid());
        wait(NULL);
    }
    
    return 0;
}`,
            language: 'c'
          }
        ],
        unitId: unitIds[12],
        subjectId: subjectIds[2],
        order: 1
      }
    ]

    // Insert topics
    const insertedTopics = await mongoose.connection.db.collection('topics').insertMany(topics)
    const topicIds = Object.values(insertedTopics.insertedIds)

    // Update units with topic references
    await mongoose.connection.db.collection('units').updateOne(
      { _id: unitIds[0] },
      { $set: { topics: [topicIds[0], topicIds[1]] } }
    )
    await mongoose.connection.db.collection('units').updateOne(
      { _id: unitIds[1] },
      { $set: { topics: [topicIds[2]] } }
    )
    await mongoose.connection.db.collection('units').updateOne(
      { _id: unitIds[6] },
      { $set: { topics: [topicIds[3]] } }
    )
    await mongoose.connection.db.collection('units').updateOne(
      { _id: unitIds[12] },
      { $set: { topics: [topicIds[4]] } }
    )

    // Multiple quizzes for different units
    const quizzes = [
      {
        title: 'Arrays and Strings Quiz',
        unitId: unitIds[0],
        subjectId: subjectIds[0],
        questions: [
          {
            question: 'What is the time complexity of accessing an element in an array by index?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
            correctAnswer: 0,
            explanation: 'Array elements can be accessed directly using their index, which takes constant time O(1).'
          },
          {
            question: 'Which of the following is NOT a characteristic of arrays?',
            options: [
              'Elements are stored in contiguous memory locations',
              'All elements must be of the same data type',
              'Dynamic size that can change during runtime',
              'Zero-based indexing in most programming languages'
            ],
            correctAnswer: 2,
            explanation: 'Arrays typically have a fixed size that is determined at creation time.'
          },
          {
            question: 'What is the worst-case time complexity for searching an element in an unsorted array?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctAnswer: 2,
            explanation: 'In the worst case, we might need to check every element in the array, resulting in O(n) time complexity.'
          }
        ],
        timeLimit: 20
      },
      {
        title: 'Linked Lists Quiz',
        unitId: unitIds[1],
        subjectId: subjectIds[0],
        questions: [
          {
            question: 'What is the main advantage of linked lists over arrays?',
            options: ['Faster access time', 'Dynamic size', 'Better cache performance', 'Less memory usage'],
            correctAnswer: 1,
            explanation: 'Linked lists can grow or shrink during runtime, unlike arrays which have fixed size.'
          },
          {
            question: 'What is the time complexity of inserting an element at the beginning of a linked list?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
            correctAnswer: 0,
            explanation: 'Inserting at the beginning only requires updating the head pointer, which is O(1).'
          }
        ],
        timeLimit: 15
      },
      {
        title: 'Database Fundamentals Quiz',
        unitId: unitIds[6],
        subjectId: subjectIds[1],
        questions: [
          {
            question: 'What does DBMS stand for?',
            options: ['Database Management System', 'Data Base Management Software', 'Database Manipulation System', 'Data Management System'],
            correctAnswer: 0,
            explanation: 'DBMS stands for Database Management System.'
          },
          {
            question: 'Which level of database architecture describes how data is physically stored?',
            options: ['External Level', 'Conceptual Level', 'Internal Level', 'Logical Level'],
            correctAnswer: 2,
            explanation: 'The Internal Level describes the physical storage of data.'
          }
        ],
        timeLimit: 15
      }
    ]

    await mongoose.connection.db.collection('quizzes').insertMany(quizzes)

    // Get final counts
    const finalCounts = {
      subjects: await mongoose.connection.db.collection('subjects').countDocuments(),
      units: await mongoose.connection.db.collection('units').countDocuments(),
      topics: await mongoose.connection.db.collection('topics').countDocuments(),
      quizzes: await mongoose.connection.db.collection('quizzes').countDocuments()
    }

    return NextResponse.json({
      message: 'Database seeded successfully!',
      counts: finalCounts,
      subjectIds: subjectIds.map(id => id.toString()),
      unitIds: unitIds.map(id => id.toString())
    })

  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { message: 'Seeding failed', error: error.message },
      { status: 500 }
    )
  }
}