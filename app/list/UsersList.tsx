import Image from 'next/image';
import React from 'react';
import styles from './UsersList.module.scss';

export default async function UsersLis({ users }) {
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
        </li>
        {users.map((user) => {
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
                    style={{ borderRadius: '50px' }}
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
              </li>
            </>
          );
        })}
      </ul>
    </div>
    // <table>

    //   <tr>
    //     <th>Image</th>
    //     <th>Username</th>
    //     <th>Nackname</th>
    //     <th>Description</th>
    //     <th>Interests</th>
    //   </tr>
    //   {users.map((user) => {
    //     return (
    //       <>
    //         <tr>
    //           <td>
    //             <Image
    //               alt="userImage"
    //               src={user.imageUrl}
    //               width={100}
    //               height={100}
    //               className={styles.userImage}
    //             />
    //           </td>
    //           <td>{user.username}</td>
    //           <td>{user.nickname}</td>
    //           <td>{user.description}</td>
    //           <td>
    //             {user.categories.map((category) => {
    //               return category ? <p>{category.name}</p> : null;
    //             })}
    //           </td>
    //         </tr>
    //       </>
    //     );
    //   })}
    // </table>
  );
}
