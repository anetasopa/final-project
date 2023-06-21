'use client';
import Image from 'next/image';

export function LoadImage({
  handleOnChange,
  handleOnSubmit,
  imageUrl,
  uploadData,
}) {
  return (
    <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
      <p>
        <input type="file" name="file" />
      </p>

      <img src={imageUrl} />

      {imageUrl && !uploadData && (
        <p>
          <button>Upload Files</button>
        </p>
      )}

      {uploadData && (
        <code>
          <pre>{JSON.stringify(uploadData, null, 2)}</pre>
        </code>
      )}
    </form>
  );
}
