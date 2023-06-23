import Image from 'next/image';
import React from 'react';
import { User } from '../../database/users';
import { Category } from '../../migrations/1686916405-createTableCategories';
import styles from './UsersList.module.scss';

type Props = {
  userId: number;
  users: User[];
  categories: Category[];
};

export default async function UsersLis({ users, userId, categories }: Props) {
  const filteredUsers = users.filter((user) => user.id !== userId);
  const usersCategories = categories;
  console.log({ filteredUsers });
  console.log({ usersCategories });

  // let chars = ['A', 'B', 'A', 'C', 'B'];
  // let uniqueChars = [...new Set(chars)];

  // console.log(uniqueChars);

  // console.log({ commonNames });
  const commonCategories = categories.map((category) => category.name);
  console.log({ commonCategories });

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
        </li>
        {filteredUsers.map((user) => {
          return (
            <>
              <li className={styles.tableRow}>
                <div
                  className={`${styles.col} ${styles.col1}`}
                  data-label="Image"
                >
                  <Image
                    alt="userImage"
                    src={user.imageUrl}
                    width={100}
                    height={100}
                    className={styles.profileImg}
                  />
                </div>
                <div
                  className={`${styles.col} ${styles.col2}`}
                  data-label="Username"
                >
                  {user.username}
                </div>
                <div
                  className={`${styles.col} ${styles.col3}`}
                  data-label="Nickname"
                >
                  {user.nickname}
                </div>
                <div
                  className={`${styles.col} ${styles.col4}`}
                  data-label="Description"
                >
                  {user.description}
                </div>
                <div
                  className={`${styles.col} ${styles.col5}`}
                  data-label="Interests"
                >
                  <div className={styles.categoriesContainer}>
                    {user.categories.map((category) => {
                      return category ? <p>{category.name}</p> : null;
                    })}
                  </div>
                </div>
                <div
                  className={`${styles.col} ${styles.col5}`}
                  data-label="Common interests"
                >
                  <div className={styles.categoriesContainer}>
                    {/* {commonNames} */}
                    {user.categories.map((category) => {
                      if (
                        category &&
                        category.name.includes(commonCategories)
                      ) {
                        return <p key={category.id}>{category.name}</p>;
                      }
                      return null;
                    })}
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
