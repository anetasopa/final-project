import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getUsersById,
  updateUserById,
  User,
} from '../../../../../database/users';

type Error = {
  error: string;
};

export type CreateResponseBodyGet = { user: User } | Error;
export type CreateResponseBodyPost = { user: User } | Error;

const animalSchema = z.object({
  nickname: z.string(),
  description: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CreateResponseBodyGet>> {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'There is no such user!',
      },
      { status: 400 },
    );
  }

  const user = await getUsersById(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: user });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CreateResponseBodyPost>> {
  const userId = Number(params.userId);
  const body = await request.json();

  console.log({ userId });

  console.log({ body });

  if (!userId) {
    return NextResponse.json(
      {
        error: 'There is no such user!',
      },
      { status: 400 },
    );
  }

  const result = animalSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  const user = await updateUserById(
    userId,
    result.data.nickname,
    result.data.description,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    user: user,
  });
}
