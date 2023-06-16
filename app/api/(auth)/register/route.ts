import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUser,
  getUsersByUserName,
  User,
} from '../../../../database/users';

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

  const newUser = await createUser(
    result.data.username,
    result.data.email,
    await passwordHash,
  );

  if (!newUser) {
    return NextResponse.json(
      {
        error: 'Error creating the new user!',
      },
      { status: 500 },
    );
  }

  if (!newUser) return NextResponse.json({ user: newUser });
}
