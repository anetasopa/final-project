import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteUserById,
  getUserBySessionToken,
  getUsersById,
  updateUserContacts,
} from '../../../../database/users';
import { User } from '../users/route';

type Error = {
  error: string;
};

export type CreateResponseBodyPut = { user: User } | Error;
export type CreateResponseBodyDelete = { user: User } | Error;

const userSchema = z.object({
  userId: z.number(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CreateResponseBodyPut>> {
  // make sure the parameters are ok
  // const result = userSchema.safeParse(params);
  // console.log({ result });

  // if (!result.success) {
  //   return NextResponse.json(
  //     {
  //       error: 'The data is incomplete',
  //     },
  //     { status: 400 },
  //   );
  // }

  // get the currently logged in user
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const loggedInUser = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!loggedInUser) {
    return NextResponse.json(
      {
        error: 'There is no such user!',
      },
      { status: 401 },
    );
  }

  // select the user you want to follow/add to contacts
  const body = await request.json();
  const followedUserId = body.followedUserId;
  let followedUser = await getUsersById(followedUserId);

  if (!followedUser) {
    return NextResponse.json(
      {
        error: 'There is no such user!',
      },
      { status: 400 },
    );
  }

  await updateUserContacts(loggedInUser.id, followedUser.id);

  return NextResponse.json({ message: 'User added to your contacts' });
}
