import styles from './Search.module.scss';

export default function Search() {
  return (
    <div className={styles.searchContainer}>
      <input className={styles.searchInput} placeholder="Search" />
    </div>
  );
}
