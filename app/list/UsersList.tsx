import Image from 'next/image';
import React from 'react';
import styles from './UsersList.module.scss';

export default async function UsersLis({ users }) {
  return (
    <table>
      {users.map((user) => {
        return (
          <>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Nackname</th>
              <th>Description</th>
              <th>Interests</th>
            </tr>
            <tr>
              <td>
                <Image
                  alt="userImage"
                  src={user.imageUrl}
                  width={100}
                  height={100}
                  className={styles.userImage}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.nickname}</td>
              <td>{user.description}</td>
              <td>
                {user.categories.map((category) => {
                  return category ? <p>{category.name}</p> : null;
                })}
              </td>
            </tr>
          </>
        );
      })}
    </table>
  );
}
