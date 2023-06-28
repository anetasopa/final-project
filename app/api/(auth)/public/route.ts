import * as Ably from 'ably/promises';
import * as dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

dotenv.config();

export type Error = {
  error: string;
};

type UsersResponseBodyPOST = { message: Ably.Rest } | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UsersResponseBodyPOST>> {
  console.log('/api/public called');

  if (!process.env.ABLY_API_KEY) {
    return NextResponse.json(
      {
        error: `Missing ABLY_API_KEY environment variable.
        If you're running locally, please ensure you have a ./.env file with a value for ABLY_API_KEY=your-key.
        If you're running in Netlify, make sure you've configured env variable ABLY_API_KEY.
        Please see README.md for more details on configuring your Ably API Key.`,
      },
      { status: 500 },
    );
  }

  const client = new Ably.Rest(process.env.ABLY_API_KEY);

  var channel = client.channels.get('status-updates');
  const message: { text: string } = request.body;

  const disallowedWords = ['foo', 'bar', 'fizz', 'buzz'];

  const containsDisallowedWord = disallowedWords.some((word) => {
    return message.text.match(new RegExp(`\\b${word}\\b`));
  });

  if (containsDisallowedWord) {
    return NextResponse.json(
      {
        error: 'Contains disallowed word.',
      },
      { status: 403 },
    );
  }

  await channel.publish('update-from-server', message);

  if (message) {
    return NextResponse.json(
      {
        error: 'Message.',
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    message: message,
  });
}
