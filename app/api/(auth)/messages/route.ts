import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserBySessionToken,
  getUsersById,
  updateUserContacts,
} from '../../../../database/users';
import { User } from '../users/route';

type Error = {
  error: string;
};

export type CreateResponseBodyPost = { user: User } | Error;

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CreateResponseBodyPost>> {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const creatorUserId = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!creatorUserId) {
    return NextResponse.json(
      {
        error: 'There is no such user!',
      },
      { status: 401 },
    );
  }

  const body = await request.json();
  const receiverUserId = body.receiverUserId;
  let receiverUser = await getUsersById(receiverUserId);

  if (!receiverUser) {
    return NextResponse.json(
      {
        error: 'There is no such user!',
      },
      { status: 400 },
    );
  }

  await updateUserContacts(creatorUserId.id, followedUser.id);

  return NextResponse.json({ message: 'Message is added!' });
}
