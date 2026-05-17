import { NextRequest, NextResponse } from 'next/server';
import { rsvpSchema } from '@/lib/schemas';
import connectDB from '@/lib/mongoose';
import RSVP from '@/lib/models/RSVP';

// Rate limiting (simple in-memory store)
const rateLimiter = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimiter.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 }); // 1 hour
    return true;
  }

  if (limit.count >= 10) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    console.log('RSVP API: Starting request processing');

    // Connect to MongoDB
    console.log('RSVP API: Attempting MongoDB connection');
    await connectDB();
    console.log('RSVP API: MongoDB connection successful');

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = rsvpSchema.parse(body);

    // Get additional metadata
    const userAgent = request.headers.get('user-agent') || '';

    // Create new RSVP document
    const rsvpData = {
      name: validatedData.name,
      attendance: validatedData.attendance,
      guestsCount: validatedData.guestsCount,
      guestNames: validatedData.guestNames,
      phone: validatedData.phone,
      userAgent,
      ip,
    };

    const newRSVP = new RSVP(rsvpData);
    await newRSVP.save();

    return NextResponse.json({
      ok: true,
      message: 'RSVP submitted successfully',
      id: newRSVP._id
    });

  } catch (error: any) {
    console.error('RSVP submission error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    });

    // Handle validation errors
    if (error.name === 'ValidationError' || error.name === 'ZodError') {
      return NextResponse.json(
        { ok: false, error: 'Invalid data provided', details: error.message },
        { status: 400 }
      );
    }

    // Handle MongoDB connection errors
    if (error.name === 'MongoError' ||
        error.name === 'MongoServerError' ||
        error.name === 'MongoNetworkError' ||
        error.message?.includes('ENOTFOUND') ||
        error.message?.includes('connection')) {
      return NextResponse.json(
        { ok: false, error: 'Database connection error', details: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { ok: false, error: 'Failed to submit RSVP', details: error.message },
      { status: 500 }
    );
  }
}