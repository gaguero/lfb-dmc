import { NextRequest, NextResponse } from 'next/server';

/**
 * Enhanced error logging for API routes
 */
const logApiError = (error: unknown, context: Record<string, unknown> = {}) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    route: '/api/sendBooking',
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
    context,
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.group('🚨 API Error');
    console.error('Route:', errorInfo.route);
    console.error('Error:', errorInfo.error);
    console.error('Context:', errorInfo.context);
    console.error('Timestamp:', errorInfo.timestamp);
    console.groupEnd();
  }

  // In production, you would send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    console.error('API_ERROR', errorInfo);
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }
};

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    const requestBody = await request.json();
    const { locations, checkIn, totalNights, people, name, email, notes } = requestBody;

    // Validate required fields
    if (!locations || !checkIn || !totalNights || !people || !name || !email) {
      const missingFields = [];
      if (!locations) missingFields.push('locations');
      if (!checkIn) missingFields.push('checkIn');
      if (!totalNights) missingFields.push('totalNights');
      if (!people) missingFields.push('people');
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      
      logApiError(new Error('Missing required fields'), {
        requestId,
        missingFields,
        receivedBody: requestBody,
      });
      
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}`,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Log the booking request (you can replace this with actual processing)
    console.log(`📝 Booking request received [${requestId}]:`, {
      locations,
      checkIn,
      totalNights,
      people,
      name,
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Mask email for privacy
      notes: notes ? '[notes provided]' : '[no notes]',
    });

    // Here you would typically:
    // 1. Validate the data (✅ basic validation added)
    // 2. Save to database
    // 3. Send confirmation email
    // 4. Process payment if needed

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request received successfully.',
      requestId,
    });
  } catch (error) {
    // Enhanced error logging
    logApiError(error, {
      requestId,
      userAgent: request.headers.get('user-agent'),
      contentType: request.headers.get('content-type'),
      method: request.method,
      url: request.url,
    });
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process booking request. Please try again or contact support.',
        code: 'INTERNAL_ERROR',
        requestId,
      },
      { status: 500 }
    );
  }
} 