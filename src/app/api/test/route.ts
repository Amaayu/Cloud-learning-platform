import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import mongoose from 'mongoose'

export async function GET() {
  try {
    await dbConnect()
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)
    
    // Count documents in each collection
    const counts = {}
    for (const name of collectionNames) {
      try {
        counts[name] = await mongoose.connection.db.collection(name).countDocuments()
      } catch (error) {
        counts[name] = 'Error counting'
      }
    }
    
    return NextResponse.json({
      message: 'Database connection successful',
      collections: collectionNames,
      documentCounts: counts
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { message: 'Database connection failed', error: error.message },
      { status: 500 }
    )
  }
}