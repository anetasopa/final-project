import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import util from 'util';
import { User } from '../../database/users';
import styles from './UsersList.module.scss';

export default async function UsersLis({ result }) {
  return (
    <div className={styles.container}>
      <ul className={styles.responsiveTable}>
        <li className={styles.tableHeader}>
          <div className={`${styles.col} ${styles.col1} ${styles.bold}`}>
            Image
          </div>
          <div className={`${styles.col} ${styles.col2} ${styles.bold}`}>
            Username
          </div>
          <div className={`${styles.col} ${styles.col3} ${styles.bold}`}>
            Nackname
          </div>
          <div className={`${styles.col} ${styles.col4} ${styles.bold}`}>
            Description
          </div>
          <div className={`${styles.col} ${styles.col5} ${styles.bold}`}>
            Interests
          </div>
          <div className={`${styles.col} ${styles.col5} ${styles.bold}`}>
            Common interests
          </div>
          <div className={`${styles.col} ${styles.col5} ${styles.bold}`}>
            Percentage
          </div>
        </li>
        {result.map((user) => {
          return (
            <>
              <li className={styles.tableRow}>
                <div
                  className={`${styles.col} ${styles.col1}`}
                  data-label="Image"
                >
                  <Image
                    alt="userImage"
                    src={user.user.imageUrl}
                    width={100}
                    height={100}
                    className={styles.profileImg}
                  />
                </div>
                <div
                  className={`${styles.col} ${styles.col2}`}
                  data-label="Username"
                >
                  <Link href="/chat">{user.user.username}</Link>
                </div>
                <div
                  className={`${styles.col} ${styles.col3}`}
                  data-label="Nickname"
                >
                  {user.user.nickname}
                </div>
                <div
                  className={`${styles.col} ${styles.col4}`}
                  data-label="Description"
                >
                  {user.user.description}
                </div>
                <div
                  className={`${styles.col} ${styles.col5}`}
                  data-label="Interests"
                >
                  <div className={styles.categoriesContainer}>
                    {user.user.categories.map((category) => {
                      return category ? <p>{category.name}</p> : null;
                    })}
                  </div>
                </div>
                <div
                  className={`${styles.col} ${styles.col5}`}
                  data-label="Percentage"
                >
                  <div className={styles.categoriesContainer}>
                    {user.commonInterestsInPercentage}
                  </div>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
