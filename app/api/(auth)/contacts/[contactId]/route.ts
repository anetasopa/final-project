import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteUserById, User } from '../../../../../database/users';

type Error = {
  error: string;
};

export type CreateResponseBodyDelete = { user: User } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<CreateResponseBodyDelete>> {
  const contactId = Number(params.contactId);

  console.log({ userId123456: contactId });

  if (!contactId) {
    return NextResponse.json(
      {
        error: 'Invalid user id',
      },
      { status: 400 },
    );
  }

  const user = await deleteUserById(contactId);

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
