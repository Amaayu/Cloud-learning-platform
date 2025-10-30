export interface Subject {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: 'frontend' | 'backend' | 'core' | 'ai-ml';
  units?: Unit[];
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  _id: string;
  title: string;
  description: string;
  subjectId: string;
  topics?: Topic[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  _id: string;
  title: string;
  content: string;
  examples: {
    title: string;
    description: string;
    code: string;
    language: string;
  }[];
  unitId: string;
  subjectId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  _id: string;
  title: string;
  unitId: string;
  subjectId: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
  timeLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  bookmarks: string[];
  progress: {
    subjectId: string;
    completedTopics: string[];
    completedUnits: string[];
    progressPercentage: number;
  }[];
  theme: 'light' | 'dark' | 'system';
  createdAt: string;
  updatedAt: string;
}