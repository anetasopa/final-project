import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUsersWithLimitAndOffsetBySessionToken } from '../../../../database/users';

export type User = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  // account_id: number;
  nickname: string;
  // image_url: string;
  description: string;
};

export type Error = {
  error: string;
};

type UsersResponseBodyGet = { animals: User[] } | Error;

const animalSchema = z.object({
  username: z.string(),
  email: z.string(),
  password_hash: z.string(),
  nickname: z.string(),
  description: z.string(),
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<UsersResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  console.log('This comes from the API', session);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Session token is not valid',
      },
      { status: 401 },
    );
  }

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  // query the database to get all the animals only if a valid session token is passed
  const users = await getUsersWithLimitAndOffsetBySessionToken(
    limit,
    offset,
    sessionTokenCookie.value,
  );

  return NextResponse.json({ users: users });
}
