import styles from './Search.module.scss';

export default function Search({ searchName, setSearchName }) {
  return (
    <div className={styles.searchContainer}>
      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className={styles.searchInput}
        type="text"
        placeholder="Search by username"
      />
    </div>
  );
}
