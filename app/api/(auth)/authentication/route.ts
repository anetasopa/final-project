import * as Ably from 'ably/promises';
import * as dotenv from 'dotenv';
import { NextResponse } from 'next/server';

dotenv.config();

export type Error = {
  error: string;
};

type UsersResponseBodyGet = Ably.Types.TokenRequest | Error;

export async function GET(): Promise<NextResponse<UsersResponseBodyGet>> {
  console.log('/api/authentication called');
  // console.log('auth key? :', process.env.ABLY_API_KEY);

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

  const clientId = process.env.DEFAULT_CLIENT_ID || 'NO_CLIENT_ID';
  const client = new Ably.Rest(process.env.ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: clientId,
  });

  return NextResponse.json(tokenRequestData);
}
