import { NextRequest, NextResponse } from 'next/server';
import { unfollowUserById } from '../../../../../database/users';

type Error = {
  error: string;
};

export type CreateResponseBodyDelete = { message: string } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CreateResponseBodyDelete>> {
  const contactId = Number(params.contactId);

  if (!contactId) {
    return NextResponse.json(
      {
        error: 'Invalid user id',
      },
      { status: 400 },
    );
  }

  await unfollowUserById(contactId);

  return NextResponse.json({ message: 'User unfollowed!' });
}
