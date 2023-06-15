import { notFound } from 'next/navigation';
import { getUsersByUserName } from '../../../database/users';

type Props = { params: { userName: string } };

export default async function ProfileUserIdPage({ params }: Props) {
  const user = await getUsersByUserName(params.userName);

  if (!user) {
    notFound();
  }

  return (
    <>
      <div>id: {user.id}</div>
      <div>userName: {user.userName}</div>
      <div>email: {user.email}</div>
    </>
  );
}
