import mongoose from 'mongoose';

export interface IUnit extends mongoose.Document {
  title: string;
  description: string;
  subjectId: mongoose.Types.ObjectId;
  topics: mongoose.Types.ObjectId[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a unit title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [300, 'Description cannot be more than 300 characters'],
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  }],
  order: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Unit = mongoose.models.Unit || mongoose.model<IUnit>('Unit', UnitSchema);
export default Unit;