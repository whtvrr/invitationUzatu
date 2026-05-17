import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import RSVP from '@/lib/models/RSVP';

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

    // Connect to MongoDB
    await connectDB();

    // Get query parameters for filtering and pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const sortBy = url.searchParams.get('sortBy') || 'timestamp';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';
    const attendance = url.searchParams.get('attendance');
    const search = url.searchParams.get('search');

    // Build query
    const query: any = {};

    if (attendance && attendance !== 'all') {
      query.attendance = attendance;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { guestNames: { $elemMatch: { $regex: search, $options: 'i' } } }
      ];
    }

    // Build sort object
    const sortObj: any = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;

    const [submissions, totalCount] = await Promise.all([
      RSVP.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .select('-__v') // Exclude version field
        .lean(), // Return plain objects instead of Mongoose documents
      RSVP.countDocuments(query)
    ]);

    // Get statistics
    const stats = await RSVP.aggregate([
      {
        $group: {
          _id: '$attendance',
          count: { $sum: 1 },
          totalGuests: {
            $sum: {
              $cond: [
                { $eq: ['$attendance', 'with'] },
                { $add: ['$guestsCount', 1] }, // +1 for the person themselves
                { $cond: [{ $eq: ['$attendance', 'come'] }, 1, 0] }
              ]
            }
          }
        }
      }
    ]);

    // Transform submissions to match expected format
    const transformedSubmissions = submissions.map((submission: any) => ({
      _id: submission._id,
      submittedAt: submission.timestamp || submission.createdAt,
      language: 'қазақша', // Fixed since we removed language field
      name: submission.name,
      attendance: submission.attendance,
      guestsCount: submission.guestsCount || 0,
      guestNames: submission.guestNames ? submission.guestNames.join(', ') : '',
      phone: submission.phone || '',
      ip: submission.ip || '',
      userAgent: submission.userAgent || '',
    }));

    // Transform stats
    const statisticsObj = {
      come: { count: 0, totalGuests: 0 },
      with: { count: 0, totalGuests: 0 },
      no: { count: 0, totalGuests: 0 },
      total: totalCount
    };

    stats.forEach(stat => {
      if (statisticsObj[stat._id as keyof typeof statisticsObj]) {
        (statisticsObj[stat._id as keyof typeof statisticsObj] as any).count = stat.count;
        (statisticsObj[stat._id as keyof typeof statisticsObj] as any).totalGuests = stat.totalGuests;
      }
    });

    return NextResponse.json({
      submissions: transformedSubmissions,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      },
      statistics: statisticsObj
    });

  } catch (error: any) {
    console.error('Admin submissions error:', error);

    // Handle MongoDB connection errors
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}