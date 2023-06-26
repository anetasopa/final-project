import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUsersById, updateUserContacts } from '../../../../database/users';
import { User } from '../users/route';

type Error = {
  error: string;
};

export type CreateResponseBodyPut = { user: User } | Error;

const userSchema = z.object({
  userId: z.number(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CreateResponseBodyPut>> {
  const userId = Number(params.userId);
  const body = await request.json();

  console.log({ body123: body });

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

  const userContacts = await updateUserContacts(userId, result.data.userId);
  console.log({ userContacts123: userContacts });

  user = await getUsersById(userId);

  return NextResponse.json({
    user,
    userContacts,
  });
}
