import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { locations, checkIn, totalNights, people, name, email, notes } = await request.json();

    // Log the booking request (you can replace this with actual processing)
    console.log('Booking request received:', {
      locations,
      checkIn,
      totalNights,
      people,
      name,
      email,
      notes
    });

    // Here you would typically:
    // 1. Validate the data
    // 2. Save to database
    // 3. Send confirmation email
    // 4. Process payment if needed

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request received successfully.' 
    });
  } catch (error) {
    console.error('Error processing booking request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process booking request.' },
      { status: 500 }
    );
  }
} 