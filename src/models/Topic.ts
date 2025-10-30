import mongoose from 'mongoose';

export interface ITopic extends mongoose.Document {
  title: string;
  content: string;
  examples: {
    title: string;
    description: string;
    code: string;
    language: string;
  }[];
  unitId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a topic title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide topic content'],
  },
  examples: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: 'javascript',
    },
  }],
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
  order: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Topic = mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema);
export default Topic;