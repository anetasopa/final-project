'use client';

export function LoadImage({ handleSubmit, handleFileChange, filename }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input onChange={handleFileChange} />
        <label>{filename}</label>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}
