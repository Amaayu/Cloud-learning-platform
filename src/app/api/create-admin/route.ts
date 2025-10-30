import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    await dbConnect()

    // Admin user credentials
    const adminData = {
      name: 'Admin User',
      email: 'admin@cselearn.com',
      password: 'admin123456',
      role: 'admin'
    }

    // Check if admin already exists
    const existingAdmin = await mongoose.connection.db
      .collection('users')
      .findOne({ email: adminData.email })

    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin user already exists!',
        email: adminData.email,
        password: 'admin123456'
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(adminData.password, salt)

    // Create admin user
    const adminUser = await mongoose.connection.db.collection('users').insertOne({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: 'admin',
      bookmarks: [],
      progress: [],
      theme: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return NextResponse.json({
      message: '✅ Admin user created successfully!',
      email: adminData.email,
      password: adminData.password,
      loginUrl: 'http://localhost:3000/auth/login',
      adminDashboard: 'http://localhost:3000/admin'
    })

  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json(
      { message: 'Error creating admin user', error: error.message },
      { status: 500 }
    )
  }
}