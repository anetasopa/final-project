import Image from 'next/image';
import React from 'react';
import styles from './page.module.scss';
import ProfileForm from './ProfileForm';

export default function Profile() {
  return (
    <main className={styles.profileContainer}>
      <div className={styles.background}></div>
      <div className={styles.info}>
        <Image
          alt="userImage"
          src="/images/photo2.jpeg"
          width={300}
          height={300}
          className={styles.userImage}
        />
        <div>
          <div></div>
          <div>
            <ProfileForm />
          </div>
        </div>
      </div>
    </main>
  );
}
