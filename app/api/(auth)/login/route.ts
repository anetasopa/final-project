import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { string, z } from 'zod';
import {
  getUsersWithPasswordHashByUserName,
  User,
} from '../../../../database/users';

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

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Email or password missing!',
      },
      { status: 406 },
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
