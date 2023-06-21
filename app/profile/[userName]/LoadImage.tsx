'use client';
import Image from 'next/image';
import styles from './LoadImage.module.scss';

export function LoadImage({
  handleOnChange,
  handleOnSubmit,
  imageUrl,
  uploadData,
  showInput,
}) {
  return (
    <>
      {showInput ? (
        <form
          className={styles.form}
          method="post"
          onChange={handleOnChange}
          // onSubmit={handleOnSubmit}
        >
          <p>
            <input className={styles.upload} type="file" name="file" />
          </p>
        </form>
      ) : (
        ''
      )}
    </>
  );
}
