import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle the booking request
    const { locations, checkIn, totalNights, people, name, email, notes } = req.body;

    // Perform necessary operations, e.g., save to database, send confirmation email, etc.

    res.status(200).json({ success: true, message: 'Booking request received.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 