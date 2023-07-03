import Image from 'next/image';
import Link from 'next/link';
import styles from './Profile.module.scss';

export default function Profile({ userContacts, receiverId }) {
  const receiverUser = userContacts.find(
    (contact) => contact.userId === receiverId,
  );
  const receiverImageUrl = receiverUser ? receiverUser.imageUrl : '';
  const receiverNickname = receiverUser ? receiverUser.nickname : '';
  // const receiverUsername = receiverUser ? receiverUser.username : '';

  return (
    <div className={styles.profileContainer}>
      {receiverUser && (
        <Image
          alt="userImage"
          src={receiverImageUrl}
          width={50}
          height={50}
          className={styles.receiverImageUrl}
        />
      )}
      <p className={styles.nickname}>{receiverNickname}</p>
    </div>
  );
}
