import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import mongoose from 'mongoose'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subjectId: string }> }
) {
  try {
    await dbConnect()
    const { subjectId } = await params

    // Get subject
    const subject = await mongoose.connection.db
      .collection('subjects')
      .findOne({ _id: new mongoose.Types.ObjectId(subjectId) })

    if (!subject) {
      return NextResponse.json(
        { message: 'Subject not found' },
        { status: 404 }
      )
    }

    // Get units for this subject
    const units = await mongoose.connection.db
      .collection('units')
      .find({ subjectId: new mongoose.Types.ObjectId(subjectId) })
      .sort({ order: 1 })
      .toArray()

    // Get topics for each unit
    for (let unit of units) {
      const topics = await mongoose.connection.db
        .collection('topics')
        .find({ unitId: unit._id })
        .sort({ order: 1 })
        .toArray()
      unit.topics = topics
    }

    subject.units = units

    return NextResponse.json(subject)
  } catch (error) {
    console.error('Error fetching subject:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    )
  }
}