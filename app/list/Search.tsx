import styles from './Search.module.scss';

type Props = {
  searchName: string;
  setSearchName: (value: string) => void;
};

export default function Search({ searchName, setSearchName }: Props) {
  return (
    <div className={styles.searchContainer}>
      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className={styles.searchInput}
        placeholder="Search by username"
      />
    </div>
  );
}
