import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getUserCategories,
  getUsersById,
  updateCategoriesOfUserById,
  updateUserById,
  updateUserImageById,
} from '../../../../../database/users';
import { User } from '../../../../../migrations/1686751602-createTableUsers';
import { Category } from '../../../../../migrations/1686916405-createTableCategories';

type Error = {
  error: string;
};

export type CreateResponseBodyGet = { user: User } | Error;
export type CreateResponseBodyPut =
  | { user: User; userCategories: Category[]; userImage: any }
  | Error;

const userSchema = z.object({
  nickname: z.string(),
  description: z.string(),
  idSelectedCategories: z.array(z.number()),
  imageUrl: z.string(),
  userId: z.number(),
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
): Promise<NextResponse<CreateResponseBodyPut>> {
  const userId = Number(params.userId);
  const body = await request.json();

  if (!userId) {
    return NextResponse.json(
      {
        error: 'There is no such user!',
      },
      { status: 400 },
    );
  }

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  let user = await getUsersById(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  await updateUserById(userId, result.data.nickname, result.data.description);

  await updateCategoriesOfUserById(userId, result.data.idSelectedCategories);
  const userCategories = await getUserCategories(userId);

  const userImage = await updateUserImageById(userId, result.data.imageUrl);

  user = await getUsersById(userId);

  console.log({ userCategories, user, userImage });

  return NextResponse.json({
    user,
    userCategories,
    userImage,
  });
}
