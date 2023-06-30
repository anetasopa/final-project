'use client';

import styles from './LoadImage.module.scss';

export function LoadImage({ handleOnChange, showInput }) {
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
