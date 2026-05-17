import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';

export async function GET() {
  try {
    console.log('Warmup: Pre-establishing MongoDB connection...');
    await connectDB();
    console.log('Warmup: MongoDB connection ready');

    return NextResponse.json({
      ok: true,
      message: 'Database connection established',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Warmup: Connection failed:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to establish connection' },
      { status: 500 }
    );
  }
}