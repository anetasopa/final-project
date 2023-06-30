import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { string, z } from 'zod';
import { createSession } from '../../../../database/sessions';
import {
  getUsersWithPasswordHashByUserName,
  User,
} from '../../../../database/users';
import { secureCookieOptions } from '../../../../util/cookies';

type Error = {
  error: string;
};

export type LoginResponseBodyPost = { user: User } | Error;

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();
  console.log({ body });

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Email or password missing!',
      },
      { status: 400 },
    );
  }

  const userWithPasswordHash = await getUsersWithPasswordHashByUserName(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        error: 'Email or password not valid!',
      },
      { status: 401 },
    );
  }

  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: 'User or password not valid!',
      },
      { status: 401 },
    );
  }

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        error: 'User or password not valid!',
      },
      { status: 401 },
    );
  }

  const token = crypto.randomBytes(100).toString('base64');

  const session = await createSession(token, userWithPasswordHash.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json(
    {
      user: {
        username: userWithPasswordHash.username,
        id: userWithPasswordHash.id,
      },
    },
    {
      status: 200,
    },
  );
}
