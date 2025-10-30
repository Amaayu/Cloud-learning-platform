import mongoose from 'mongoose';

export interface IQuiz extends mongoose.Document {
  title: string;
  unitId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
  timeLimit: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a quiz title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  questions: [{
    question: {
      type: String,
      required: true,
    },
    options: [{
      type: String,
      required: true,
    }],
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    explanation: {
      type: String,
    },
  }],
  timeLimit: {
    type: Number,
    default: 30, // 30 minutes default
  },
}, {
  timestamps: true,
});

const Quiz = mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
export default Quiz;