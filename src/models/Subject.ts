import mongoose from 'mongoose';

export interface ISubject extends mongoose.Document {
  title: string;
  description: string;
  image: string;
  category: 'frontend' | 'backend' | 'core' | 'ai-ml';
  units: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a subject title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'core', 'ai-ml'],
    required: [true, 'Please specify a category'],
  },
  units: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
  }],
}, {
  timestamps: true,
});

const Subject = mongoose.models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema);
export default Subject;