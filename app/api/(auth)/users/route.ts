import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUsersWithLimitAndOffsetBySessionToken } from '../../../../database/users';
import { User } from '../../../../migrations/1686751602-createTableUsers';

export type Error = {
  error: string;
};

type UsersResponseBodyGet = { users: User[] } | Error;

export async function GET(
  request: NextRequest,
): Promise<NextResponse<UsersResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

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

  const users = await getUsersWithLimitAndOffsetBySessionToken(
    limit,
    offset,
    sessionTokenCookie.value,
  );

  return NextResponse.json({ users: users });
}
