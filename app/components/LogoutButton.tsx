'use client';

import styles from './LogoutButton.module.scss';

type Props = {
  logout: () => void;
};

export function LogoutButton(props: Props) {
  return (
    <div className={styles.form}>
      <button
        className={styles.buttonLogout}
        onClick={async () => {
          await props.logout();
        }}
      >
        {' '}
        Logout
      </button>
    </div>
  );
}
