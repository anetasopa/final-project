'use client';

import styles from './LoadImage.module.scss';

type Props = {
  handleOnChange: (changeEvent: any) => Promise<void>;
  showInput: boolean;
};

export function LoadImage({ handleOnChange, showInput }: Props) {
  return (
    <div>
      {!showInput ? (
        <form
          className={styles.form}
          method="post"
          onChange={handleOnChange}
          // onSubmit={handleOnSubmit}
        >
          <div className={styles.uploadContainer}>
            <label className={styles.uploadContainer} htmlFor="image">
              Upload
            </label>
            <input
              className={styles.upload}
              id="image"
              type="file"
              name="file"
            />
          </div>
        </form>
      ) : (
        ''
      )}
    </div>
  );
}
