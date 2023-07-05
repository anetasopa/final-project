import { NextRequest, NextResponse } from 'next/server';
import { saveMessages } from '../../../../database/messages';
import { Message } from '../../../../migrations/1687893283-createTableMessages';

type Error = {
  error: string;
};

export type SaveMessagesResponseBodyPost = { message: Message } | Error;

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<SaveMessagesResponseBodyPost>> {
  const body = await request.json();

  await saveMessages(body.inputMessage, body.userId, body.receiverId);

  return NextResponse.json({ message: 'Message is added!' });
}
