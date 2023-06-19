'use client';

import { useRouter } from 'next/navigation';
import { CreateResponseBodyPost } from '../../api/(auth)/users/[userId]/route';
import styles from './SaveButton.module.scss';

type Props = {
  userId: number;
  nickname: string;
  description: string;
};

async function create({
  error,
  setError,
  userId,
  nickname,
  description,
}: Props) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, nickname, description }),
    });

    if (response.status !== 500) {
      console.log(response);
      const data: CreateResponseBodyPost = await response.json();

      if ('error' in data) {
        setError(data.error);
      }

      if ('user' in data) {
        setError(data.user);
      }
    }
  } catch (e) {
    console.log({ e });
  }
}

export function SaveButton(props: Props) {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  return (
    <form>
      <button
        className={styles.buttonSave}
        formAction={async () => {
          router.push('/yourprofile');
          await create({ error, setError, userId, nickname, description });
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
