'use client';

import styles from './LoadImage.module.scss';

type Props = {
  handleOnChange: () => void;
  showInput: () => void;
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
          <p>
            <input className={styles.upload} type="file" name="file" />
          </p>
        </form>
      ) : (
        ''
      )}
    </div>
  );
}
