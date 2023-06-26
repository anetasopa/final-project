'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { CgAddR } from 'react-icons/cg';
import { User } from '../../database/users';
import { CreateResponseBodyPut } from '../api/(auth)/contacts/route';
import Search from './Search';
import styles from './UsersList.module.scss';

type Props = {
  userId: number;
  users: User[];
  result: any;
};

async function add({ id, userId }) {
  try {
    const response = await fetch(`/api/contacts/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ id, userId }),
    });

    if (response.status !== 500) {
      const data: CreateResponseBodyPut = await response.json();

      if ('error' in data) {
        console.log(data.error);
      }

      if ('user' in data) {
        console.log(data.user);
      }
    }
  } catch (e) {
    console.log({ e });
  }
}

export default function UsersLis({ result, users, userId }: Props) {
  const [searchName, setSearchName] = useState('');
  console.log({ searchName });
  console.log({ user123: userId });

  const userName = users.map((user) => user.username);
  // console.log(userName);

  return (
    <>
      <Search setSearchName={setSearchName} searchName={searchName} />

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
            <div className={`${styles.col} ${styles.col5} ${styles.bold}`}>
              Add
            </div>
          </li>
          {result.map((user) => {
            console.log({ user });
            return (
              <>
                <li className={styles.tableRow}>
                  <div
                    className={`${styles.col} ${styles.col1}`}
                    data-label="Image"
                  >
                    <div className={styles.categoriesContainer}>
                      <Image
                        alt="userImage"
                        src={user.user.imageUrl}
                        width={100}
                        height={100}
                        className={styles.profileImg}
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col2}`}
                    data-label="Username"
                  >
                    <div className={styles.categoriesContainer}>
                      <Link href="/chat">{user.user.username}</Link>
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col3}`}
                    data-label="Nickname"
                  >
                    <div className={styles.categoriesContainer}>
                      {!user.user.nickname ? <p> - </p> : user.user.nickname}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col4}`}
                    data-label="Description"
                  >
                    <div className={styles.categoriesContainer}>
                      {!user.user.description ? (
                        <p> - </p>
                      ) : (
                        user.user.description
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col5}`}
                    data-label="Interests"
                  >
                    <div className={styles.categoriesContainer}>
                      {user.user.categories &&
                      user.user.categories.length > 0 ? (
                        user.user.categories.map((category) => {
                          return category ? <p>{category.name}</p> : null;
                        })
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`${styles.col} ${styles.col5}`}
                    data-label="Common interests"
                  >
                    <div className={styles.categoriesContainer}>
                      {user.commonCategories &&
                      user.commonCategories.length > 0 ? (
                        user.commonCategories.map((category) => {
                          return category ? <p>{category.name}</p> : null;
                        })
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col5}`}
                    data-label="Percentage"
                  >
                    <div className={styles.categoriesContainer}>
                      {user.commonInterestsInPercentage ? (
                        <p>
                          {Math.floor(
                            Math.round(user.commonInterestsInPercentage),
                          )}{' '}
                          %
                        </p>
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col2} ${styles.addContainer}`}
                    data-label="Add"
                  >
                    <div>
                      <button
                        onClick={async () => {
                          await add({ id: user.user.id, userId: userId });
                        }}
                        className={styles.buttonAdd}
                      >
                        <CgAddR />
                      </button>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}
