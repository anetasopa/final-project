import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import {
  createUser,
  getUsersByUserName,
  User,
} from '../../../../database/users';
import { secureCookieOptions } from '../../../../util/cookies';

type Error = {
  error: string;
};

export type RegisterResponseBodyPost = { user: User } | Error;

const userSchema = z.object({
  username: z.string().min(5),
  email: z.string().min(5),
  password: z.string().min(5),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  console.log(request);

  const result = userSchema.safeParse(body);

  // try {
  //   const a = userSchema.safeParse(body);
  //   console.log({ a: a, error: a.error });
  // } catch (e) {
  //   console.log({ e });
  // }

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'User, email or password missing!',
      },
      { status: 406 },
    );
  }

  if (await getUsersByUserName(result.data.username)) {
    return NextResponse.json(
      {
        error: 'User is already used!',
      },
      { status: 400 },
    );
  }

  const passwordHash = bcrypt.hash(result.data.password, 10);

  const imageUrlDefault =
    'https://res.cloudinary.com/dkanovye3/image/upload/v1687429458/my-uploads/pwzxdjpie5iqnou4vrhv.png';

  const newUser = await createUser(
    result.data.username,
    result.data.email,
    await passwordHash,
    imageUrlDefault,
  );

  if (!newUser) {
    return NextResponse.json(
      {
        error: 'Error creating the new user!',
      },
      { status: 500 },
    );
  }

  const token = crypto.randomBytes(100).toString('base64');
  // 6. Create the session record

  const session = await createSession(token, newUser.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 7. Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  if (!newUser) return NextResponse.json({ user: newUser });
}
