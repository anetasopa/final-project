'use client';

import { useRouter } from 'next/navigation';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import styles from './LogoutButton.module.scss';

type Props = {
  logout: () => void;
};

export function LogoutButton(props: Props) {
  const router = useRouter();

  return (
    <form className={styles.form}>
      <button
        className={styles.buttonLogout}
        formAction={async () => {
          router.push('/');
          await props.logout();
          router.refresh();
        }}
      >
        {' '}
        Logout
        {/* <RiLogoutCircleRLine
          style={{
            marginRight: '30px',
          }}
          size="30px"
        /> */}
      </button>
    </form>
  );
}
