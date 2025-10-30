import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import mongoose from 'mongoose'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    await dbConnect()
    const { topicId } = await params

    // Get topic
    const topic = await mongoose.connection.db
      .collection('topics')
      .findOne({ _id: new mongoose.Types.ObjectId(topicId) })

    if (!topic) {
      return NextResponse.json(
        { message: 'Topic not found' },
        { status: 404 }
      )
    }

    // Get unit info
    const unit = await mongoose.connection.db
      .collection('units')
      .findOne({ _id: topic.unitId }, { projection: { title: 1 } })

    // Get subject info
    const subject = await mongoose.connection.db
      .collection('subjects')
      .findOne({ _id: topic.subjectId }, { projection: { title: 1 } })

    topic.unit = unit
    topic.subject = subject

    return NextResponse.json(topic)
  } catch (error) {
    console.error('Error fetching topic:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    )
  }
}