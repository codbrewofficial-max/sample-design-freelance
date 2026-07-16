import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, message, sourceId } = body;

    // Basic validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Nama wajib diisi.' }, { status: 400 });
    }
    if (!contact || !contact.trim()) {
      return NextResponse.json({ error: 'Kontak WhatsApp / email wajib diisi.' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Detail pesan wajib diisi.' }, { status: 400 });
    }

    // Process lead: In our public boilerplate, we log to console (can be connected to email/webhook/database later)
    console.log('=== LEAD SUBMISSION RECEIVED ===');
    console.log(`Source Section ID : ${sourceId || 'Unknown'}`);
    console.log(`Name              : ${name.trim()}`);
    console.log(`Contact           : ${contact.trim()}`);
    console.log(`Message           : ${message.trim()}`);
    console.log(`Timestamp         : ${new Date().toISOString()}`);
    console.log('================================');

    // Return success response back to the client
    return NextResponse.json({
      success: true,
      message: 'Pesan Anda berhasil terkirim! Tim kami akan segera menindaklanjuti dan menghubungi Anda.',
    }, { status: 200 });

  } catch (error) {
    console.error('API Leads processing error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan internal server saat memproses pesan.' }, { status: 500 });
  }
}
