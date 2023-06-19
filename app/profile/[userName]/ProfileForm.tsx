'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Select from 'react-select';
import { Category } from '../../../migrations/1686916405-createTableCategories';
import styles from './ProfileForm.module.scss';

type Props = {
  categories: Category[];
};

export default async function ProfileForm(props: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  interface CategoriesOption {
    readonly value: string;
    readonly label: string;
  }

  const categoriesOption: readonly CategoriesOption[] = [
    { value: 'running', label: 'Running' },
    { value: 'programming', label: 'Programming' },
    { value: 'football', label: 'Football' },
    { value: 'tarvel', label: 'Tarvel' },
    { value: 'computer game', label: 'Computer game' },
    { value: 'trip', label: 'Trip' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'nature', label: 'Nature' },
  ];

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="name">Nickname</label>
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
      <Link
        className={styles.buttonCreate}
        href="/yourprofile"
        style={{
          textDecoration: 'none',
        }}
      >
        Create
      </Link>
    </form>
  );
}
