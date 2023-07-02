import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { saveMessages } from '../../../../database/messages';
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
  const body = await request.json();

  console.log({ body1234567: body });

  // const cookieStore = cookies();
  // const sessionToken = cookieStore.get('sessionToken');

  // const creatorUserId = !sessionToken?.value
  //   ? undefined
  //   : await getUserBySessionToken(sessionToken.value);

  // console.log({ creatorUserId1234567: creatorUserId });

  // if (!creatorUserId) {
  //   return NextResponse.json(
  //     {
  //       error: 'There is no such user!',
  //     },
  //     { status: 401 },
  //   );
  // }

  // let creatorUser = await getUsersById(creatorUserId);

  // if (!creatorUser) {
  //   return NextResponse.json(
  //     {
  //       error: 'There is no such user!',
  //     },
  //     { status: 400 },
  //   );
  // }

  await saveMessages(body.inputMessage, body.userId, body.receiverId);

  return NextResponse.json({ message: 'Message is added!' });
}
