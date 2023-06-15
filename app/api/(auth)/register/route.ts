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

type RegisterResponseBodyPost = { user: User } | Error;

const userSchema = z.object({
  userName: z.string().min(5),
  email: z.string().min(5),
  password: z.string().min(5),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  console.log({ body });

  const result = userSchema.safeParse(body);

  console.log({ result });

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'User or password missing!',
      },
      { status: 406 },
    );
  }

  console.log({ userName: await getUsersByUserName(result.data.userName) });

  if (await getUsersByUserName(result.data.userName)) {
    return NextResponse.json(
      {
        error: 'User is already used!',
      },
      { status: 400 },
    );
  }

  console.log({
    userName: await createUser(
      result.data.userName,
      result.data.email,
      result.data.password,
    ),
  });

  const password_hash = bcrypt.hash(result.data.password, 10);

  console.log({ password_hash });

  return NextResponse.json({ user: { id: 1, userName: 'Alex' } });
}
