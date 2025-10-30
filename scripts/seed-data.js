const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Define schemas directly
const SubjectSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  image: { type: String, required: true },
  category: { type: String, enum: ['frontend', 'backend', 'core', 'ai-ml'], required: true },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }],
}, { timestamps: true });

const UnitSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 300 },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  order: { type: Number, required: true },
}, { timestamps: true });

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
  examples: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true, default: 'javascript' },
  }],
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  order: { type: Number, required: true },
}, { timestamps: true });

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String },
  }],
  timeLimit: { type: Number, default: 30 },
}, { timestamps: true });

const Subject = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);
const Unit = mongoose.models.Unit || mongoose.model('Unit', UnitSchema);
const Topic = mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);

const comprehensiveData = {
  subjects: [
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
    {
      title: 'Computer Networks',
      description: 'Explore networking protocols, OSI model, TCP/IP, and network security.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      category: 'core',
    },
    {
      title: 'Web Development',
      description: 'Build modern web applications with HTML, CSS, JavaScript, and popular frameworks.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400',
      category: 'frontend',
    },
    {
      title: 'AI & Machine Learning',
      description: 'Introduction to artificial intelligence, machine learning algorithms, and neural networks.',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400',
      category: 'ai-ml',
    },
  ],
  
  units: {
    'Data Structures & Algorithms': [
      { title: 'Arrays and Strings', description: 'Fundamental linear data structures for storing and manipulating data', order: 1 },
      { title: 'Linked Lists', description: 'Dynamic data structures with pointer-based connections', order: 2 },
      { title: 'Stacks and Queues', description: 'LIFO and FIFO data structures with specific access patterns', order: 3 },
      { title: 'Trees and Binary Trees', description: 'Hierarchical data structures for efficient searching and sorting', order: 4 },
      { title: 'Graphs', description: 'Network structures representing relationships between entities', order: 5 },
      { title: 'Dynamic Programming', description: 'Optimization technique for solving complex problems efficiently', order: 6 },
    ],
    'Database Management System': [
      { title: 'Introduction to DBMS', description: 'Database concepts, architecture, and data models', order: 1 },
      { title: 'Entity-Relationship Model', description: 'Conceptual database design using ER diagrams', order: 2 },
      { title: 'Relational Model', description: 'Mathematical foundation of relational databases', order: 3 },
      { title: 'SQL Fundamentals', description: 'Structured Query Language for database operations', order: 4 },
      { title: 'Normalization', description: 'Database design principles to eliminate redundancy', order: 5 },
      { title: 'Transaction Management', description: 'ACID properties and concurrency control', order: 6 },
    ],
    'Operating Systems': [
      { title: 'OS Introduction', description: 'Operating system concepts and system architecture', order: 1 },
      { title: 'Process Management', description: 'Process creation, scheduling, and synchronization', order: 2 },
      { title: 'Memory Management', description: 'Virtual memory, paging, and memory allocation', order: 3 },
      { title: 'File Systems', description: 'File organization, directory structures, and storage', order: 4 },
      { title: 'I/O Management', description: 'Device drivers, interrupt handling, and I/O scheduling', order: 5 },
      { title: 'Security and Protection', description: 'Access control, authentication, and system security', order: 6 },
    ],
    'Computer Networks': [
      { title: 'Network Fundamentals', description: 'Basic networking concepts and network types', order: 1 },
      { title: 'OSI and TCP/IP Models', description: 'Network protocol stack and layer architecture', order: 2 },
      { title: 'Data Link Layer', description: 'Frame transmission, error detection, and MAC protocols', order: 3 },
      { title: 'Network Layer', description: 'IP addressing, routing algorithms, and packet forwarding', order: 4 },
      { title: 'Transport Layer', description: 'TCP, UDP, and reliable data transmission', order: 5 },
      { title: 'Application Layer', description: 'HTTP, DNS, email protocols, and network applications', order: 6 },
    ],
    'Web Development': [
      { title: 'HTML & CSS Fundamentals', description: 'Structure and styling of web pages', order: 1 },
      { title: 'JavaScript Basics', description: 'Client-side scripting and DOM manipulation', order: 2 },
      { title: 'Frontend Frameworks', description: 'React, Vue, and modern frontend development', order: 3 },
      { title: 'Backend Development', description: 'Server-side programming with Node.js and databases', order: 4 },
      { title: 'Web APIs and Services', description: 'RESTful APIs, GraphQL, and web services', order: 5 },
      { title: 'Deployment and DevOps', description: 'Cloud deployment, CI/CD, and production practices', order: 6 },
    ],
    'AI & Machine Learning': [
      { title: 'AI Introduction', description: 'Artificial intelligence concepts and applications', order: 1 },
      { title: 'Machine Learning Basics', description: 'Supervised, unsupervised, and reinforcement learning', order: 2 },
      { title: 'Linear Regression', description: 'Statistical modeling and prediction algorithms', order: 3 },
      { title: 'Classification Algorithms', description: 'Decision trees, SVM, and classification techniques', order: 4 },
      { title: 'Neural Networks', description: 'Deep learning and artificial neural networks', order: 5 },
      { title: 'ML Applications', description: 'Real-world applications and project implementation', order: 6 },
    ],
  },

  topics: {
    // Data Structures & Algorithms Topics
    'Arrays and Strings': [
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

## Memory Representation

\`\`\`
Array: [10, 20, 30, 40, 50]
Memory: [1000][1004][1008][1012][1016]
Index:    0     1     2     3     4
\`\`\`

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

// C++ - Static and Dynamic Arrays
#include <array>
#include <vector>

// Static array
std::array<int, 5> numbers = {1, 2, 3, 4, 5};

// Dynamic array (vector)
std::vector<int> dynamicNumbers = {1, 2, 3, 4, 5};

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

// Bounds checking
console.log(arr[10]);  // Output: undefined (out of bounds)
console.log(arr[-1]);  // Output: undefined (negative index)

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

### Two Pointers Technique
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Use Case**: Pair finding, palindrome checking

### Sliding Window
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Use Case**: Subarray problems, optimization

## Array Manipulation Patterns

1. **Prefix Sum**: Precompute cumulative sums for range queries
2. **Kadane's Algorithm**: Maximum subarray sum
3. **Dutch National Flag**: Three-way partitioning
4. **Merge Technique**: Combining sorted arrays`,
        order: 2,
        examples: [
          {
            title: 'Array Traversal Methods',
            description: 'Different approaches to iterate through array elements',
            code: `let numbers = [1, 2, 3, 4, 5];

// 1. Traditional for loop
console.log("Traditional for loop:");
for (let i = 0; i < numbers.length; i++) {
    console.log(\`Index \${i}: \${numbers[i]}\`);
}

// 2. For...of loop (ES6)
console.log("\\nFor...of loop:");
for (let num of numbers) {
    console.log(num);
}

// 3. For...in loop (gets indices)
console.log("\\nFor...in loop:");
for (let index in numbers) {
    console.log(\`Index \${index}: \${numbers[index]}\`);
}

// 4. forEach method
console.log("\\nforEach method:");
numbers.forEach((num, index) => {
    console.log(\`Index \${index}: \${num}\`);
});

// 5. While loop
console.log("\\nWhile loop:");
let i = 0;
while (i < numbers.length) {
    console.log(numbers[i]);
    i++;
}

// 6. Reverse traversal
console.log("\\nReverse traversal:");
for (let i = numbers.length - 1; i >= 0; i--) {
    console.log(numbers[i]);
}`,
            language: 'javascript'
          },
          {
            title: 'Linear and Binary Search Implementation',
            description: 'Implementation of fundamental search algorithms',
            code: `// Linear Search - O(n) time complexity
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Binary Search - O(log n) time complexity
// Prerequisite: Array must be sorted
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

// Recursive Binary Search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1; // Base case: not found
    }
    
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Example usage
let unsortedArray = [64, 34, 25, 12, 22, 11, 90];
let sortedArray = [11, 12, 22, 25, 34, 64, 90];

console.log("Linear Search:");
console.log(linearSearch(unsortedArray, 22)); // Output: 4

console.log("\\nBinary Search:");
console.log(binarySearch(sortedArray, 22));   // Output: 2
console.log(binarySearchRecursive(sortedArray, 22)); // Output: 2`,
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

### Advanced Operations
1. **Pattern Matching**: Regular expressions
2. **Parsing**: Extract structured data
3. **Formatting**: Template strings and interpolation
4. **Transformation**: Case conversion, trimming

## String Algorithms

### 1. **Pattern Matching**
- **Naive Algorithm**: O(nm) time complexity
- **KMP Algorithm**: O(n+m) time complexity
- **Rabin-Karp**: O(n+m) average case

### 2. **String Manipulation**
- **Palindrome Check**: O(n) time
- **Anagram Detection**: O(n log n) or O(n)
- **Longest Common Subsequence**: O(nm)

## Memory Considerations

### String Storage
\`\`\`
String: "HELLO"
Memory: ['H']['E']['L']['L']['O']['\\0']
Index:   0    1    2    3    4    5
\`\`\`

### String Pool (Java/C#)
- Literal strings stored in special memory area
- Reduces memory usage through string interning
- Improves performance for string comparisons`,
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

console.log("Full names:", fullName1, fullName2, fullName3);

// String Comparison
let str4 = "apple";
let str5 = "banana";
console.log("Comparison:", str4.localeCompare(str5)); // Output: -1 (str4 < str5)

// Case Operations
let text = "Hello World";
console.log("Uppercase:", text.toUpperCase());    // HELLO WORLD
console.log("Lowercase:", text.toLowerCase());    // hello world

// Substring Operations
console.log("Substring(0,5):", text.substring(0, 5)); // Hello
console.log("Slice(6):", text.slice(6));              // World
console.log("Slice(-5):", text.slice(-5));            // World`,
            language: 'javascript'
          },
          {
            title: 'String Search and Manipulation',
            description: 'Advanced string operations including searching and manipulation',
            code: `let text = "The quick brown fox jumps over the lazy dog";

// String Searching
console.log("indexOf 'fox':", text.indexOf("fox"));           // 16
console.log("lastIndexOf 'the':", text.lastIndexOf("the"));   // 31
console.log("includes 'quick':", text.includes("quick"));     // true
console.log("startsWith 'The':", text.startsWith("The"));     // true
console.log("endsWith 'dog':", text.endsWith("dog"));         // true

// String Splitting and Joining
let words = text.split(" ");
console.log("Words array:", words);
console.log("Rejoined:", words.join("-"));

// String Replacement
let newText = text.replace("fox", "cat");
console.log("Replaced:", newText);

// Replace all occurrences
let textWithMultiple = "hello world hello universe";
let replacedAll = textWithMultiple.replace(/hello/g, "hi");
console.log("Replace all:", replacedAll);

// String Trimming
let paddedText = "   Hello World   ";
console.log("Original:", "'" + paddedText + "'");
console.log("Trimmed:", "'" + paddedText.trim() + "'");
console.log("Trim start:", "'" + paddedText.trimStart() + "'");
console.log("Trim end:", "'" + paddedText.trimEnd() + "'");

// Character Code Operations
let char = 'A';
console.log("Char code of 'A':", char.charCodeAt(0));        // 65
console.log("Char from code 66:", String.fromCharCode(66));  // B

// Regular Expressions
let email = "user@example.com";
let emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
console.log("Valid email:", emailPattern.test(email));       // true`,
            language: 'javascript'
          }
        ]
      }
    ],

    'Linked Lists': [
      {
        title: 'Linked List Fundamentals',
        content: `# Linked List Fundamentals

## What is a Linked List?

A linked list is a linear data structure where elements (nodes) are stored in sequence, but unlike arrays, the elements are not stored in contiguous memory locations. Instead, each node contains data and a reference (or link) to the next node in the sequence.

## Node Structure

Each node in a linked list typically contains:
1. **Data**: The actual value stored in the node
2. **Next**: A reference/pointer to the next node

\`\`\`
Node Structure:
┌─────────┬─────────┐
│  Data   │  Next   │
└─────────┴─────────┘
\`\`\`

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

## Disadvantages of Linked Lists

1. **No Random Access**: Must traverse from head to reach elements
2. **Extra Memory**: Requires additional memory for pointers
3. **Cache Performance**: Poor cache locality due to non-contiguous memory
4. **Not Suitable for Binary Search**: Cannot access middle element directly

## Time Complexity Analysis

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| Access | O(n) | Must traverse from head |
| Search | O(n) | Linear search required |
| Insertion | O(1) | At known position |
| Deletion | O(1) | At known position |
| Insertion at beginning | O(1) | Update head pointer |
| Insertion at end | O(n) | Must traverse to end |`,
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
    
    // Insert at specific position - O(n)
    insertAtPosition(position, data) {
        if (position < 0 || position > this.size) {
            throw new Error("Invalid position");
        }
        
        if (position === 0) {
            this.insertAtBeginning(data);
            return;
        }
        
        const newNode = new ListNode(data);
        let current = this.head;
        
        for (let i = 0; i < position - 1; i++) {
            current = current.next;
        }
        
        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }
    
    // Delete by value - O(n)
    delete(data) {
        if (!this.head) return false;
        
        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.data !== data) {
            current = current.next;
        }
        
        if (current.next) {
            current.next = current.next.next;
            this.size--;
            return true;
        }
        
        return false;
    }
    
    // Search for a value - O(n)
    search(data) {
        let current = this.head;
        let position = 0;
        
        while (current) {
            if (current.data === data) {
                return position;
            }
            current = current.next;
            position++;
        }
        
        return -1;
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
    
    // Get size
    getSize() {
        return this.size;
    }
    
    // Check if list is empty
    isEmpty() {
        return this.size === 0;
    }
}

// Example usage
const list = new SinglyLinkedList();

list.insertAtBeginning(10);
list.insertAtBeginning(20);
list.insertAtEnd(30);
list.insertAtPosition(1, 25);

list.display(); // Output: 20 -> 25 -> 10 -> 30 -> null

console.log("Size:", list.getSize()); // Output: 4
console.log("Search 25:", list.search(25)); // Output: 1

list.delete(25);
list.display(); // Output: 20 -> 10 -> 30 -> null`,
            language: 'javascript'
          }
        ]
      }
    ],

    // Database Management System Topics
    'Introduction to DBMS': [
      {
        title: 'Database Concepts and Architecture',
        content: `# Database Concepts and Architecture

## What is a Database?

A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).

## Key Database Concepts

### 1. **Data**
- Raw facts and figures
- Can be numbers, text, images, audio, video
- Becomes information when processed and organized

### 2. **Database**
- Collection of related data
- Represents some aspect of the real world
- Logically coherent collection with inherent meaning

### 3. **Database Management System (DBMS)**
- Software system that enables users to define, create, maintain, and control access to databases
- Acts as an interface between database and end users

## DBMS Architecture

### Three-Level Architecture (ANSI-SPARC)

#### 1. **External Level (View Level)**
- Highest level of abstraction
- Describes how individual users see the data
- Multiple external views possible
- Provides data independence

#### 2. **Conceptual Level (Logical Level)**
- Community view of the database
- Describes what data is stored and relationships
- Independent of physical storage details
- Defined using conceptual schema

#### 3. **Internal Level (Physical Level)**
- Lowest level of abstraction
- Describes how data is physically stored
- Deals with storage structures and access methods
- Defined using internal schema

## Data Independence

### 1. **Logical Data Independence**
- Ability to change conceptual schema without affecting external schemas
- Changes in logical structure don't affect application programs

### 2. **Physical Data Independence**
- Ability to change internal schema without affecting conceptual schema
- Changes in storage structures don't affect logical structure

## Database Users

### 1. **Database Administrators (DBA)**
- Manage and maintain database systems
- Handle security, backup, recovery
- Monitor performance and optimize

### 2. **Database Designers**
- Design database structure
- Create conceptual and logical schemas
- Ensure data integrity and normalization

### 3. **End Users**
- **Naive Users**: Use predefined applications
- **Sophisticated Users**: Write their own queries
- **Specialized Users**: Use specialized database applications

### 4. **Application Programmers**
- Develop database applications
- Write programs that interact with databases
- Create user interfaces and business logic`,
        order: 1,
        examples: [
          {
            title: 'Database System Components',
            description: 'Understanding the components of a typical database system',
            code: `/*
Database System Components Example

1. HARDWARE
   - Physical computers, storage devices
   - Network infrastructure
   - Servers and workstations

2. SOFTWARE
   - DBMS software (MySQL, PostgreSQL, Oracle)
   - Operating system
   - Application programs
   - Utilities and tools

3. DATA
   - Operational data (user data)
   - Metadata (data about data)
   - System catalog
   - Indexes and statistics

4. PROCEDURES
   - Instructions for using the system
   - Backup and recovery procedures
   - Security protocols
   - Maintenance procedures

5. PEOPLE
   - Database administrators
   - Database designers
   - Application programmers
   - End users
*/

-- Example of Three-Level Architecture

-- EXTERNAL LEVEL (Views)
-- Student View
CREATE VIEW StudentView AS
SELECT student_id, name, email, major
FROM Students
WHERE active = 'Y';

-- Faculty View
CREATE VIEW FacultyView AS
SELECT student_id, name, email, gpa, major, enrollment_date
FROM Students;

-- CONCEPTUAL LEVEL (Logical Schema)
-- Complete logical structure
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    gpa DECIMAL(3,2),
    major VARCHAR(50),
    enrollment_date DATE,
    active CHAR(1) DEFAULT 'Y'
);

-- INTERNAL LEVEL (Physical Schema)
-- Storage details (conceptual representation)
/*
Physical Storage Details:
- Table stored in tablespace: STUDENT_DATA
- Index on student_id: B-tree structure
- Index on email: Hash structure
- Data pages: 8KB blocks
- Buffer pool allocation: 100MB
- File organization: Heap file
*/`,
            language: 'sql'
          }
        ]
      }
    ],

    // Add more topics for other subjects...
    'OS Introduction': [
      {
        title: 'Operating System Fundamentals',
        content: `# Operating System Fundamentals

## What is an Operating System?

An Operating System (OS) is system software that manages computer hardware and software resources and provides common services for computer programs. It acts as an intermediary between users and the computer hardware.

## Functions of Operating System

### 1. **Process Management**
- Process creation and termination
- Process scheduling and synchronization
- Inter-process communication
- Deadlock handling

### 2. **Memory Management**
- Memory allocation and deallocation
- Virtual memory management
- Memory protection
- Garbage collection

### 3. **File System Management**
- File creation, deletion, and modification
- Directory management
- File access control
- Storage allocation

### 4. **I/O System Management**
- Device driver management
- I/O scheduling
- Buffering and caching
- Error handling

### 5. **Security and Protection**
- User authentication
- Access control
- Data encryption
- System monitoring

## Types of Operating Systems

### 1. **Batch Operating Systems**
- Jobs are processed in batches
- No direct interaction with users
- Examples: IBM's OS/360

### 2. **Time-Sharing Systems**
- Multiple users share system simultaneously
- CPU time is divided among users
- Examples: UNIX, Linux

### 3. **Real-Time Systems**
- Respond to events within strict time constraints
- **Hard Real-Time**: Missing deadline is catastrophic
- **Soft Real-Time**: Missing deadline degrades performance

### 4. **Distributed Systems**
- Multiple processors connected by network
- Resources are shared across network
- Examples: Google's distributed systems

## System Calls

System calls provide interface between user programs and OS kernel:

### Process Control
- fork(), exec(), wait(), exit()

### File Management
- open(), read(), write(), close()

### Device Management
- ioctl(), read(), write()

### Information Maintenance
- getpid(), alarm(), sleep()

### Communication
- pipe(), shmget(), mmap()`,
        order: 1,
        examples: [
          {
            title: 'System Call Examples',
            description: 'Examples of common system calls in C programming',
            code: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <fcntl.h>

// Process Management Example
void process_management_example() {
    pid_t pid;
    
    // Create a new process
    pid = fork();
    
    if (pid == 0) {
        // Child process
        printf("Child process: PID = %d\\n", getpid());
        printf("Child's parent PID = %d\\n", getppid());
        exit(0);
    } else if (pid > 0) {
        // Parent process
        printf("Parent process: PID = %d\\n", getpid());
        printf("Created child with PID = %d\\n", pid);
        
        // Wait for child to complete
        wait(NULL);
        printf("Child process completed\\n");
    } else {
        // Fork failed
        perror("fork failed");
    }
}

// File Management Example
void file_management_example() {
    int fd;
    char buffer[100];
    ssize_t bytes_read;
    
    // Open file
    fd = open("example.txt", O_RDONLY);
    if (fd == -1) {
        perror("open failed");
        return;
    }
    
    // Read from file
    bytes_read = read(fd, buffer, sizeof(buffer) - 1);
    if (bytes_read > 0) {
        buffer[bytes_read] = '\\0';
        printf("Read from file: %s\\n", buffer);
    }
    
    // Close file
    close(fd);
}

// Memory Management Example
void memory_management_example() {
    // Allocate memory
    char *ptr = (char*)malloc(100 * sizeof(char));
    
    if (ptr == NULL) {
        printf("Memory allocation failed\\n");
        return;
    }
    
    // Use memory
    sprintf(ptr, "Hello, Operating Systems!");
    printf("Allocated memory contains: %s\\n", ptr);
    
    // Free memory
    free(ptr);
    printf("Memory freed\\n");
}

int main() {
    printf("=== Operating System Examples ===\\n\\n");
    
    printf("1. Process Management:\\n");
    process_management_example();
    
    printf("\\n2. File Management:\\n");
    file_management_example();
    
    printf("\\n3. Memory Management:\\n");
    memory_management_example();
    
    return 0;
}`,
            language: 'c'
          }
        ]
      }
    ],

    // Add more comprehensive topics for all subjects...
  },

  quizzes: {
    'Arrays and Strings': {
      title: 'Arrays and Strings Quiz',
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
        },
        {
          question: 'What is the worst-case time complexity for searching an element in an unsorted array?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correctAnswer: 2,
          explanation: 'In the worst case, we might need to check every element in the array, resulting in O(n) time complexity.'
        }
      ]
    }
  }
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Subject.deleteMany({});
    await Unit.deleteMany({});
    await Topic.deleteMany({});
    await Quiz.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create subjects
    console.log('\\n📚 Creating subjects...');
    const createdSubjects = {};
    for (const subjectData of comprehensiveData.subjects) {
      const subject = await Subject.create(subjectData);
      createdSubjects[subject.title] = subject;
      console.log('   ✓ Created subject: ' + subject.title);
    }

    // Create units
    console.log('\\n📖 Creating units...');
    const createdUnits = {};
    for (const [subjectTitle, units] of Object.entries(comprehensiveData.units)) {
      const subject = createdSubjects[subjectTitle];
      if (subject) {
        for (const unitData of units) {
          const unit = await Unit.create({
            ...unitData,
            subjectId: subject._id,
          });
          createdUnits[unit.title] = unit;
          
          // Add unit to subject
          subject.units.push(unit._id);
          await subject.save();
          
          console.log('   ✓ Created unit: ' + unit.title);
        }
      }
    }

    // Create topics
    console.log('\\n📝 Creating topics...');
    for (const [unitTitle, topics] of Object.entries(comprehensiveData.topics)) {
      const unit = createdUnits[unitTitle];
      if (unit) {
        for (const topicData of topics) {
          const topic = await Topic.create({
            ...topicData,
            unitId: unit._id,
            subjectId: unit.subjectId,
          });
          
          // Add topic to unit
          unit.topics.push(topic._id);
          await unit.save();
          
          console.log('   ✓ Created topic: ' + topic.title);
        }
      }
    }

    // Create quizzes
    console.log('\\n🧠 Creating quizzes...');
    for (const [unitTitle, quizData] of Object.entries(comprehensiveData.quizzes)) {
      const unit = createdUnits[unitTitle];
      if (unit) {
        await Quiz.create({
          ...quizData,
          unitId: unit._id,
          subjectId: unit.subjectId,
        });
        console.log('   ✓ Created quiz: ' + quizData.title);
      }
    }

    console.log('\\n🎉 Database seeded successfully!');
    console.log('\\n📊 Summary:');
    console.log('   • Subjects: ' + Object.keys(createdSubjects).length);
    console.log('   • Units: ' + Object.keys(createdUnits).length);
    console.log('   • Topics: ' + Object.keys(comprehensiveData.topics).reduce((total, unit) => total + comprehensiveData.topics[unit].length, 0));
    console.log('   • Quizzes: ' + Object.keys(comprehensiveData.quizzes).length);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();