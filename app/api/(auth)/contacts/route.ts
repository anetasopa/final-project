import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
// import { z } from 'zod';
import {
  getUserBySessionToken,
  getUsersById,
  updateUserContacts,
} from '../../../../database/users';

type Error = {
  error: string;
};

export type CreateResponseBodyPost = { message: string } | Error;

// const userSchema = z.object({
//   userId: z.number(),
// });

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateResponseBodyPost>> {
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
  const followedUser = await getUsersById(followedUserId);

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
