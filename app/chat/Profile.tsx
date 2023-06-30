import Image from 'next/image';
import styles from './Profile.module.scss';

export default function Profile({ userContacts, receiverId }) {
  const receiverUser = userContacts.find(
    (contact) => contact.userId === receiverId,
  );
  const receiverImageUrl = receiverUser ? receiverUser.imageUrl : '';
  const receiverNickname = receiverUser ? receiverUser.nickname : '';

  return (
    <div
      className={`${styles.profileContainer} ${receiverId ? 'showLine' : ''}`}
    >
      {receiverUser && (
        <Image
          alt="userImage"
          src={receiverImageUrl}
          width={30}
          height={30}
          className={styles.receiverImageUrl}
        />
      )}
      <p className={styles.nickname}>{receiverNickname}</p>
    </div>
  );
}
