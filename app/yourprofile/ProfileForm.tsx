'use client';

import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from './ProfileForm.module.scss';

export interface CategoriesOption {
  readonly value: string;
  readonly label: string;
}

export const categoriesOption: readonly CategoriesOption[] = [
  { value: 'running', label: 'Running' },
  { value: 'programming', label: 'Programming' },
  { value: 'football', label: 'Football' },
  { value: 'travel', label: 'Travel' },
  { value: 'computer game', label: 'Computer game' },
  { value: 'trip', label: 'Trip' },
  { value: 'swimming', label: 'Swimming' },
  { value: 'nature', label: 'Nature' },
];

const animatedComponents = makeAnimated();

export default function ProfileForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        required
      />
      <label htmlFor="description">Description</label>
      <textarea
        style={{ fontSize: '14px' }}
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      >
        Description
      </textarea>

      <Select
        className={styles.select}
        closeMenuOnSelect={false}
        components={categoriesOption}
        defaultValue={[categoriesOption[4], categoriesOption[5]]}
        isMulti
        options={categoriesOption}
      />
      <button className={styles.buttonCreate}>Create</button>
    </form>
  );
}
