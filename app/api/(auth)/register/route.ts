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
  errors: z.ZodIssue[] | string;
};

export type RegisterResponseBodyPost = { user: User } | Error;

const userSchema = z.object({
  username: z.string().min(5),
  email: z.string().email().min(5),
  password: z
    .string()
    .min(4, { message: 'The password must be 4 characters or more' })
    .max(10, { message: 'The password must be 10 characters or less' })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'The password must contain only letters, numbers and underscore (_)',
    ),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  const validationResult = userSchema.safeParse(body);

  // validationResult: {
  //   success: true,
  //   data: {
  //     username: 'dwde12',
  //     email: 'dxdfsasdasd@asd.pl',
  //     password: 'AA3232aaa_'
  //   }
  // }

  if (!validationResult.success) {
    return NextResponse.json(
      {
        errors: validationResult.error.issues,
      },
      { status: 406 },
    );
  }

  const userExists = await getUsersByUserName(validationResult.data.username);
  if (userExists) {
    return NextResponse.json(
      {
        errors: 'User is already used!',
      },
      { status: 400 },
    );
  }

  const passwordHash = bcrypt.hash(validationResult.data.password, 10);

  const imageUrlDefault =
    'https://res.cloudinary.com/dkanovye3/image/upload/v1687429458/my-uploads/pwzxdjpie5iqnou4vrhv.png';

  const newUser = await createUser(
    validationResult.data.username,
    validationResult.data.email,
    await passwordHash,
    imageUrlDefault,
  );

  if (!newUser) {
    return NextResponse.json(
      {
        errors: 'Error creating the new user!',
      },
      { status: 500 },
    );
  }

  const token = crypto.randomBytes(100).toString('base64');

  const session = await createSession(token, newUser.id);

  if (!session) {
    return NextResponse.json(
      {
        errors: 'Error creating the new session',
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

  if (!newUser) {
    return NextResponse.json(
      {
        errors: 'Error creating the new user',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ user: newUser });
}
