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

  interface CategoriesOption {
    readonly value: string;
    readonly label: string;
  }

  const categories = props.categories;

  const categoriesOption: readonly CategoriesOption[] = categories.map(
    (category) => {
      return { value: category.name, label: category.label };
    },
  );

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
