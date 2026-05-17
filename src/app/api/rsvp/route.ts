import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { rsvpSchema } from '@/lib/schemas';

const sheets = google.sheets('v4');

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

    // Authenticate with Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient as any });

    // Prepare row data
    const timestamp = new Date().toISOString();
    const userAgent = request.headers.get('user-agent') || '';
    const guestNamesString = validatedData.guestNames?.join(', ') || '';

    const row = [
      timestamp,
      validatedData.language,
      validatedData.name,
      validatedData.attendance,
      validatedData.guestsCount || 0,
      guestNamesString,
      validatedData.phone || '',
      ip,
      userAgent,
    ];

    // Append to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:I',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}