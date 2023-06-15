import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { string, z } from 'zod';
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

  const result = userSchema.safeParse(body);

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

  const passwordHash = bcrypt.hash(result.data.password, 10);

  const newUser = await createUser(
    result.data.userName,
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
