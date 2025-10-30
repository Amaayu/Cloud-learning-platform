import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import mongoose from 'mongoose'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query = {}

    if (category && category !== 'all') {
      query = { ...query, category }
    }

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }
    }

    // Use direct MongoDB query
    const subjects = await mongoose.connection.db
      .collection('subjects')
      .find(query)
      .sort({ createdAt: 1 })
      .toArray()

    return NextResponse.json(subjects)
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}