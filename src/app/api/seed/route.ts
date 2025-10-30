import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import mongoose from 'mongoose'

interface SubjectData {
  _id: mongoose.Types.ObjectId
  title: string
  description: string
  image: string
  category: string
}

interface UnitData {
  _id: mongoose.Types.ObjectId
  title: string
  description: string
  subjectId: mongoose.Types.ObjectId
  order: number
}

export async function POST() {
  try {
    await dbConnect()

    // Clear existing data
    await mongoose.connection.db.collection('subjects').deleteMany({})
    await mongoose.connection.db.collection('units').deleteMany({})
    await mongoose.connection.db.collection('topics').deleteMany({})
    await mongoose.connection.db.collection('quizzes').deleteMany({})

    // Create subjects
    const subjects = [
      {
        title: 'Data Structures & Algorithms',
        description: 'Master fundamental data structures and algorithmic thinking with comprehensive examples and practice problems.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
        category: 'core',
      },
      {
        title: 'Database Management System',
        description: 'Learn database design, SQL queries, normalization, and database management concepts.',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
        category: 'core',
      },
      {
        title: 'Operating Systems',
        description: 'Understand OS concepts, processes, memory management, and system calls.',
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400',
        category: 'core',
      },
    ]

    const createdSubjects: SubjectData[] = []
    for (const subjectData of subjects) {
      const result = await mongoose.connection.db.collection('subjects').insertOne({
        ...subjectData,
        units: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      createdSubjects.push({ ...subjectData, _id: result.insertedId as mongoose.Types.ObjectId })
    }

    // Create units
    const units = [
      {
        title: 'Arrays and Strings',
        description: 'Fundamental linear data structures for storing and manipulating data',
        subjectId: createdSubjects[0]._id,
        order: 1,
      },
      {
        title: 'Linked Lists',
        description: 'Dynamic data structures with pointer-based connections',
        subjectId: createdSubjects[0]._id,
        order: 2,
      },
      {
        title: 'Introduction to DBMS',
        description: 'Database concepts, architecture, and data models',
        subjectId: createdSubjects[1]._id,
        order: 1,
      },
      {
        title: 'OS Introduction',
        description: 'Operating system concepts and system architecture',
        subjectId: createdSubjects[2]._id,
        order: 1,
      },
    ]

    const createdUnits: UnitData[] = []
    for (const unitData of units) {
      const result = await mongoose.connection.db.collection('units').insertOne({
        ...unitData,
        topics: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      createdUnits.push({ ...unitData, _id: result.insertedId as mongoose.Types.ObjectId })

      // Update subject with unit reference
      await mongoose.connection.db.collection('subjects').updateOne(
        { _id: unitData.subjectId },
        { $push: { units: result.insertedId } } as any
      )
    }

    // Create topics
    const topics = [
      {
        title: 'Array Fundamentals',
        content: `# Array Fundamentals

## What is an Array?

An array is a fundamental data structure that stores elements of the same type in contiguous memory locations. Arrays provide efficient random access to elements using indices and are the building blocks for more complex data structures.

## Key Characteristics

### 1. **Contiguous Memory Layout**
- Elements are stored in consecutive memory addresses
- Enables efficient cache utilization
- Allows for pointer arithmetic

### 2. **Fixed Size**
- Size is determined at declaration time
- Cannot be changed during runtime (in static arrays)
- Memory is allocated in a single block

### 3. **Homogeneous Elements**
- All elements must be of the same data type
- Ensures consistent memory usage per element
- Enables type safety

### 4. **Zero-based Indexing**
- First element is at index 0
- Last element is at index (size - 1)
- Standard in most programming languages

## Time Complexity Analysis

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| Access | O(1) | Direct access using index |
| Search | O(n) | Linear search through elements |
| Insertion | O(n) | May require shifting elements |
| Deletion | O(n) | May require shifting elements |

## Advantages

1. **Fast Access**: O(1) random access to any element
2. **Memory Efficient**: No extra memory overhead
3. **Cache Friendly**: Contiguous memory improves cache performance
4. **Simple Implementation**: Easy to understand and implement

## Disadvantages

1. **Fixed Size**: Cannot resize dynamically
2. **Insertion/Deletion Cost**: O(n) for maintaining order
3. **Memory Waste**: May allocate more memory than needed
4. **Type Restriction**: Can only store homogeneous data`,
        unitId: createdUnits[0]._id,
        subjectId: createdUnits[0].subjectId,
        order: 1,
        examples: [
          {
            title: 'Array Declaration and Initialization',
            description: 'Different ways to create and initialize arrays in various programming languages',
            code: `// JavaScript - Dynamic Arrays
let numbers = [1, 2, 3, 4, 5];
let fruits = new Array("apple", "banana", "orange");
let empty = new Array(5); // Creates array with 5 undefined elements

// Java - Static Arrays
int[] numbers = {1, 2, 3, 4, 5};
String[] fruits = new String[3];
fruits[0] = "apple";
fruits[1] = "banana";
fruits[2] = "orange";

// Python - Lists (Dynamic Arrays)
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "orange"]
mixed = [1, "hello", 3.14, True]  # Python allows mixed types`,
            language: 'javascript'
          },
          {
            title: 'Array Access and Modification',
            description: 'How to access and modify array elements using indices',
            code: `// Accessing elements
let arr = [10, 20, 30, 40, 50];

console.log(arr[0]);    // Output: 10 (first element)
console.log(arr[2]);    // Output: 30 (third element)
console.log(arr[4]);    // Output: 50 (last element)

// Modifying elements
arr[1] = 25;           // Change second element
arr[arr.length - 1] = 55; // Change last element

console.log(arr);      // Output: [10, 25, 30, 40, 55]

// Safe access with bounds checking
function safeAccess(array, index) {
    if (index >= 0 && index < array.length) {
        return array[index];
    }
    return null; // or throw an error
}

console.log(safeAccess(arr, 2));  // Output: 30
console.log(safeAccess(arr, 10)); // Output: null`,
            language: 'javascript'
          }
        ]
      },
      {
        title: 'Array Operations and Algorithms',
        content: `# Array Operations and Algorithms

## Basic Array Operations

### 1. Traversal
Visiting each element of the array exactly once. This is the foundation for most array algorithms.

### 2. Insertion
Adding elements to the array at specific positions. May require shifting existing elements.

### 3. Deletion
Removing elements from specific positions. May require shifting remaining elements.

### 4. Searching
Finding elements or their positions within the array.

### 5. Sorting
Arranging elements in a specific order (ascending or descending).

## Common Array Algorithms

### Linear Search
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Use Case**: Unsorted arrays, small datasets

### Binary Search
- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
- **Prerequisite**: Array must be sorted
- **Use Case**: Large sorted datasets

## Array Manipulation Patterns

1. **Prefix Sum**: Precompute cumulative sums for range queries
2. **Kadane's Algorithm**: Maximum subarray sum
3. **Dutch National Flag**: Three-way partitioning
4. **Merge Technique**: Combining sorted arrays`,
        unitId: createdUnits[0]._id,
        subjectId: createdUnits[0].subjectId,
        order: 2,
        examples: [
          {
            title: 'Linear Search Implementation',
            description: 'Basic search algorithm for arrays',
            code: `// Linear Search - O(n) time complexity
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Example usage
let numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(linearSearch(numbers, 22)); // Output: 4
console.log(linearSearch(numbers, 99)); // Output: -1`,
            language: 'javascript'
          },
          {
            title: 'Binary Search Implementation',
            description: 'Efficient search algorithm for sorted arrays',
            code: `// Binary Search - O(log n) time complexity
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found target
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}

// Example usage
let sortedNumbers = [11, 12, 22, 25, 34, 64, 90];
console.log(binarySearch(sortedNumbers, 22)); // Output: 2
console.log(binarySearch(sortedNumbers, 99)); // Output: -1`,
            language: 'javascript'
          }
        ]
      },
      {
        title: 'String Fundamentals',
        content: `# String Fundamentals

## What is a String?

A string is a sequence of characters that represents textual data. In most programming languages, strings are implemented as arrays of characters, making them a special case of array data structures.

## String Characteristics

### 1. **Character Sequence**
- Ordered collection of characters
- Each character has a specific position (index)
- Can contain letters, digits, symbols, and whitespace

### 2. **Immutability (Language Dependent)**
- **Immutable**: Java, Python, JavaScript (primitive strings)
- **Mutable**: C++, C# (StringBuilder), Python (bytearray)

### 3. **Encoding**
- ASCII: 7-bit encoding (128 characters)
- UTF-8: Variable-length encoding (supports Unicode)
- UTF-16: 16-bit encoding (used by Java, JavaScript)

## String Operations

### Basic Operations
1. **Length**: Get number of characters
2. **Access**: Get character at specific index
3. **Concatenation**: Join two or more strings
4. **Substring**: Extract part of a string
5. **Search**: Find character or substring
6. **Comparison**: Compare strings lexicographically

## String Algorithms

### 1. **Pattern Matching**
- **Naive Algorithm**: O(nm) time complexity
- **KMP Algorithm**: O(n+m) time complexity
- **Rabin-Karp**: O(n+m) average case

### 2. **String Manipulation**
- **Palindrome Check**: O(n) time
- **Anagram Detection**: O(n log n) or O(n)
- **Longest Common Subsequence**: O(nm)`,
        unitId: createdUnits[0]._id,
        subjectId: createdUnits[0].subjectId,
        order: 3,
        examples: [
          {
            title: 'String Creation and Basic Operations',
            description: 'Different ways to create strings and perform basic operations',
            code: `// String Creation
let str1 = "Hello World";           // String literal
let str2 = new String("Hello");     // String object
let str3 = \`Template \${str1}\`;      // Template literal (ES6)

// Basic Properties
console.log("Length:", str1.length);        // Output: 11
console.log("Character at index 0:", str1[0]); // Output: H
console.log("Character at index 6:", str1.charAt(6)); // Output: W

// String Concatenation
let firstName = "John";
let lastName = "Doe";
let fullName1 = firstName + " " + lastName;     // Using + operator
let fullName2 = firstName.concat(" ", lastName); // Using concat method
let fullName3 = \`\${firstName} \${lastName}\`;    // Using template literals

console.log("Full names:", fullName1, fullName2, fullName3);`,
            language: 'javascript'
          }
        ]
      },
      {
        title: 'Linked List Fundamentals',
        content: `# Linked List Fundamentals

## What is a Linked List?

A linked list is a linear data structure where elements (nodes) are stored in sequence, but unlike arrays, the elements are not stored in contiguous memory locations. Instead, each node contains data and a reference (or link) to the next node in the sequence.

## Node Structure

Each node in a linked list typically contains:
1. **Data**: The actual value stored in the node
2. **Next**: A reference/pointer to the next node

## Types of Linked Lists

### 1. **Singly Linked List**
- Each node points to the next node
- Last node points to null
- Traversal only in forward direction

### 2. **Doubly Linked List**
- Each node has pointers to both next and previous nodes
- Allows bidirectional traversal
- Requires more memory per node

### 3. **Circular Linked List**
- Last node points back to the first node
- Forms a circular chain
- No null pointers (except for empty list)

## Advantages of Linked Lists

1. **Dynamic Size**: Can grow or shrink during runtime
2. **Efficient Insertion/Deletion**: O(1) at known positions
3. **Memory Efficient**: Allocates memory as needed
4. **Flexible**: Easy to implement stacks, queues, and other structures

## Time Complexity Analysis

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| Access | O(n) | Must traverse from head |
| Search | O(n) | Linear search required |
| Insertion | O(1) | At known position |
| Deletion | O(1) | At known position |`,
        unitId: createdUnits[1]._id,
        subjectId: createdUnits[1].subjectId,
        order: 1,
        examples: [
          {
            title: 'Singly Linked List Implementation',
            description: 'Complete implementation of a singly linked list with basic operations',
            code: `// Node class definition
class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Singly Linked List class
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Insert at the beginning - O(1)
    insertAtBeginning(data) {
        const newNode = new ListNode(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    
    // Insert at the end - O(n)
    insertAtEnd(data) {
        const newNode = new ListNode(data);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    // Display the list
    display() {
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        
        let result = [];
        let current = this.head;
        
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        
        console.log(result.join(" -> ") + " -> null");
    }
}

// Example usage
const list = new SinglyLinkedList();
list.insertAtBeginning(10);
list.insertAtBeginning(20);
list.insertAtEnd(30);
list.display(); // Output: 20 -> 10 -> 30 -> null`,
            language: 'javascript'
          }
        ]
      }
    ]

    const createdTopics: any[] = []
    for (const topicData of topics) {
      const result = await mongoose.connection.db.collection('topics').insertOne({
        ...topicData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      createdTopics.push({ ...topicData, _id: result.insertedId })

      // Update unit with topic reference
      await mongoose.connection.db.collection('units').updateOne(
        { _id: topicData.unitId },
        { $push: { topics: result.insertedId } } as any
      )
    }

    // Create a sample quiz
    const quiz = {
      title: 'Arrays and Strings Quiz',
      unitId: createdUnits[0]._id,
      subjectId: createdUnits[0].subjectId,
      timeLimit: 20,
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
          explanation: 'Arrays typically have a fixed size that is determined at creation time. Dynamic arrays or lists can change size, but traditional arrays cannot.'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await mongoose.connection.db.collection('quizzes').insertOne(quiz)

    return NextResponse.json({
      message: 'Database seeded successfully!',
      summary: {
        subjects: createdSubjects.length,
        units: createdUnits.length,
        topics: createdTopics.length,
        quizzes: 1
      }
    })

  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { message: 'Error seeding database', error: error.message },
      { status: 500 }
    )
  }
}