import Image from 'next/image';
import { Contact } from '../../migrations/1687774485-createTableContacts';
import styles from './Profile.module.scss';

type Props = {
  userContacts: Contact[];
  receiverId: number;
  isMobileMenuOpen: () => void;
  toggleMobileMenu: () => void;
};

export default function Profile({
  userContacts,
  receiverId,
  isMobileMenuOpen,
  toggleMobileMenu,
}: Props) {
  const receiverUser = userContacts.find(
    (contact) => contact.userId === receiverId,
  );
  const receiverImageUrl = receiverUser ? receiverUser.imageUrl : '';
  const receiverNickname = receiverUser ? receiverUser.nickname : '';
  // const receiverUsername = receiverUser ? receiverUser.username : '';

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContainerInfo}>
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

      <button className={styles.mobileButton} onClick={toggleMobileMenu}>
        {!isMobileMenuOpen ? <p>Show List</p> : <p>Hide List</p>}
      </button>
    </div>
  );
}
