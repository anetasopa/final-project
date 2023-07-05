'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { CgAddR } from 'react-icons/cg';
import { User } from '../../migrations/1686751602-createTableUsers';
import { Category } from '../../migrations/1687248585-createTableUserCategories';
import { CreateResponseBodyPost } from '../api/(auth)/contacts/route';
import Search from './Search';
import styles from './UsersList.module.scss';

type Props = {
  result: {
    user: User & {
      categories: Category[];
      isContact: boolean;
    };
    commonCategories: Category[] & { category: string };
    commonInterestsInPercentage: number;
  }[];
};

type FollowedProps = {
  followedUserId: number;
};

export default function UsersLis({ result }: Props) {
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function add({ followedUserId }: FollowedProps) {
    try {
      setIsLoading(true);
      const response = await fetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify({ followedUserId }),
      });

      if (response.status !== 500) {
        const data: CreateResponseBodyPost = await response.json();

        if ('error' in data) {
          console.log(data.error);
        }

        if ('user' in data) {
          console.log(data.user);
        }

        setIsLoading(false);
      }
    } catch (e) {
      console.log({ e });
    }
  }

  function searchAndFilterArray() {
    return result.filter((user) => {
      return user.user.username
        .toLowerCase()
        .includes(searchName.toLowerCase());
    });
  }

  const filteredResults = searchAndFilterArray();

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
          {filteredResults.map((user) => {
            console.log({ user1234567: user });
            return (
              <div key={`user-${user.user.id}`}>
                <li className={styles.tableRow}>
                  <div
                    className={`${styles.col} ${styles.col1}`}
                    data-label="Image"
                  >
                    <div className={styles.categoriesContainer}>
                      {user.user.imageUrl ? (
                        <Image
                          alt="userImage"
                          src={user.user.imageUrl}
                          width={100}
                          height={100}
                          className={styles.profileImg}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col2}`}
                    data-label="Username"
                  >
                    <div className={styles.categoriesContainer}>
                      {user.user.username ? (
                        <Link href="/chat">{user.user.username}</Link>
                      ) : null}
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
                      {user.user.categories.length > 0 ? (
                        user.user.categories.map((category) => {
                          return (
                            <p key={`category-${category.id}`}>
                              {category.name}
                            </p>
                          );
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
                      {user.commonCategories.length > 0 ? (
                        user.commonCategories.map((category) => {
                          return (
                            <p key={`category-${category.id}`}>
                              {category.name}
                            </p>
                          );
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
                    {user.user.isContact === true ? (
                      <p className={styles.addedText}>Added</p>
                    ) : (
                      <div>
                        <button
                          onClick={async () => {
                            await add({ followedUserId: user.user.id });
                          }}
                          className={styles.buttonAdd}
                        >
                          {isLoading ? (
                            <div className={styles.spinner}>
                              <p className={styles.loader}>Loading...</p>
                            </div>
                          ) : (
                            <CgAddR />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
