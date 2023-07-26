import Image from 'next/image';
import { User } from '../../migrations/1686751602-createTableUsers';
import styles from './Profile.module.scss';

type Props = {
  userContacts: User[];
  receiverId: number;
  isMobileMenuOpen: boolean;
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

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContainerInfo}>
        {!!receiverImageUrl && (
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
        {isMobileMenuOpen ? <p>Show List</p> : <p>Hide List</p>}
      </button>
    </div>
  );
}
