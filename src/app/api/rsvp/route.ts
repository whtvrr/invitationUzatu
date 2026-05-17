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
    // Connect to MongoDB
    await connectDB();

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
      language: validatedData.language,
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
    console.error('RSVP submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { ok: false, error: 'Invalid data provided' },
        { status: 400 }
      );
    }

    // Handle MongoDB connection errors
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      return NextResponse.json(
        { ok: false, error: 'Database connection error' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { ok: false, error: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}