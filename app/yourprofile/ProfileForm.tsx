// 'use client';

import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getUsersById } from '../../database/users';
import { Category } from '../../migrations/1686916405-createTableCategories';
import styles from './ProfileForm.module.scss';

export interface CategoriesOption {
  readonly value: string;
  readonly label: string;
}

type Props = {
  categories: Category[];
  userId: number;
  nickname: string;
  description: string;
};

export default function ProfileForm(props: Props) {
  // const [nickname, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [selectedOption, setSelectedOption] = useState(null);
  const userId = props.userId;

  console.log(userId);

  const user = getUsersById(userId);

  const categories = props.categories;

  const categoriesOption: readonly CategoriesOption[] = categories.map(
    (category) => {
      return { value: category.name, label: category.label };
    },
  );

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="nickname">Nickname</label>
      <p></p>
      <p></p>

      {/* <input
        id="nickname"
        value={nickname}
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
      </textarea> */}
      {categories.map((category) => {
        return <p>{category.name}</p>;
      })}
      <p></p>
      <button className={styles.buttonCreate}>Create</button>
    </form>
  );
}
