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
  userName: z.string().min(5),
  email: z.string().min(5),
  password: z.string().min(5),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

  console.log({ result });

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Email or password missing!',
      },
      { status: 406 },
    );
  }

  const userWithPasswordHash = await getUsersWithPasswordHashByUserName(
    result.data.userName,
  );

  console.log('userWithPasswordHash', userWithPasswordHash);

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        error: 'Email or password not valid!',
      },
      { status: 400 },
    );
  }

  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  console.log(
    'isValid',
    isPasswordValid,
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: 'User or password not valid!',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    user: {
      userName: userWithPasswordHash.userName,
      id: userWithPasswordHash.id,
    },
  });
}
