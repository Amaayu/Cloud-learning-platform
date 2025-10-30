import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import mongoose from 'mongoose'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    await dbConnect()
    const { unitId } = await params

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(unitId)) {
      return NextResponse.json(
        { message: 'Invalid unit ID format' },
        { status: 400 }
      )
    }

    // Get unit
    const unit = await mongoose.connection.db
      .collection('units')
      .findOne({ _id: new mongoose.Types.ObjectId(unitId) })

    if (!unit) {
      return NextResponse.json(
        { message: 'Unit not found' },
        { status: 404 }
      )
    }

    // Get topics for this unit
    const topics = await mongoose.connection.db
      .collection('topics')
      .find({ unitId: new mongoose.Types.ObjectId(unitId) })
      .sort({ order: 1 })
      .toArray()

    // Get subject info
    const subject = await mongoose.connection.db
      .collection('subjects')
      .findOne({ _id: unit.subjectId }, { projection: { title: 1 } })

    unit.topics = topics
    unit.subject = subject

    return NextResponse.json(unit)
  } catch (error) {
    console.error('Error fetching unit:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    )
  }
}