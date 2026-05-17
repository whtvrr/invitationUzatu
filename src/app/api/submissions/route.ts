import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const sheets = google.sheets('v4');

export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const adminToken = request.headers.get('x-admin-token');
    if (!adminToken || adminToken !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

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

    // Get data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:I',
    });

    const rows = response.data.values || [];

    // Skip header row if it exists
    const dataRows = rows.length > 0 && rows[0][0] !== 'submitted_at' ? rows : rows.slice(1);

    // Transform rows into objects
    const submissions = dataRows.map((row: any[]) => ({
      submittedAt: row[0] || '',
      language: row[1] || '',
      name: row[2] || '',
      attendance: row[3] || '',
      guestsCount: parseInt(row[4]) || 0,
      guestNames: row[5] || '',
      phone: row[6] || '',
      ip: row[7] || '',
      userAgent: row[8] || '',
    }));

    return NextResponse.json({ submissions });

  } catch (error) {
    console.error('Admin submissions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}