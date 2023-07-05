import { NextRequest, NextResponse } from 'next/server';
import { saveMessages } from '../../../../database/messages';

type Error = {
  error: string;
};

export type SaveMessagesResponseBodyPost = { message: string } | Error;

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<SaveMessagesResponseBodyPost>> {
  const body = await request.json();

  await saveMessages(body.inputMessage, body.userId, body.receiverId);

  return NextResponse.json({ message: 'Message is added!' });
}
