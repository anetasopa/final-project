import * as Ably from 'ably/promises';
import * as dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

dotenv.config();

export type Error = {
  error: string;
};

type UsersResponseBodyPOST = Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse | NextResponse<UsersResponseBodyPOST>> {
  console.log('/api/public called');
  const body = await request.json();

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

  let channel = client.channels.get('status-updates');
  const message: string = body.text;

  const disallowedWords = ['foo', 'bar', 'fizz', 'buzz'];

  console.log('message log ', message);
  const containsDisallowedWord = disallowedWords.some((word) => {
    return message.match(new RegExp(`\\b${word}\\b`));
  });

  if (containsDisallowedWord) {
    return NextResponse.json(
      {
        error: 'Contains disallowed word.',
      },
      { status: 403 },
    );
  }

  if (containsDisallowedWord) {
    console.log('bad word');
  }

  await channel.publish('update-from-server', 'HELLO');
  console.log('good');
  // if (message) {
  //   return NextResponse.json(
  //     {
  //       error: 'Message.',
  //     },
  //     { status: 200 },
  //   );
  // }

  return NextResponse.json({});
}
