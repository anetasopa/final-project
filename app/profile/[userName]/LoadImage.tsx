'use client';

import React from 'react';
import styles from './LoadImage.module.scss';

type Props = {
  handleOnChange: (changeEvent: any) => Promise<void>;
  showInput: boolean;
  isImageUploaded: boolean;
};

export function LoadImage({
  handleOnChange,
  showInput,
  isImageUploaded,
}: Props) {
  return (
    <div>
      {!showInput ? (
        <form className={styles.form} method="post" onChange={handleOnChange}>
          <div className={styles.uploadContainer}>
            <label className={styles.uploadContainer} htmlFor="image">
              {isImageUploaded ? 'Uploading...' : 'Upload'}
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
