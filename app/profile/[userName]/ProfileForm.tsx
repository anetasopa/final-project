'use client';

import { cookies } from 'next/headers';
import React, { useState } from 'react';
import Select from 'react-select';
import { Category } from '../../../migrations/1686916405-createTableCategories';
import { CreateResponseBodyPost } from '../../api/(auth)/users/[userId]/route';
import styles from './ProfileForm.module.scss';

type Props = {
  categories: Category[];
  userId: number;
  nickname: string;
  description: string;
};

interface CategoriesOption {
  readonly value: string;
  readonly label: string;
}

async function create({ setShowInput, userId, nickname, description }: Props) {
  setShowInput(false);
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, nickname, description }),
    });

    if (response.status !== 500) {
      const data: CreateResponseBodyPost = await response.json();

      if ('error' in data) {
        console.log(data.error);
      }

      if ('user' in data) {
        console.log(data.user);
      }
    }
  } catch (e) {
    console.log({ e });
  }
}

export default function ProfileForm(props: Props) {
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  // const [error, setError] = useState<string>('');

  const [showInput, setShowInput] = useState(true);

  const handleSaveClick = () => {
    setShowInput(false);
  };

  const categories = props.categories;

  const userId = props.userId;

  const categoriesOption: readonly CategoriesOption[] = categories.map(
    (category) => {
      return { value: category.name, label: category.label };
    },
  );

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="nickname">Nickname</label>

      {showInput ? (
        <input
          id="nickname"
          value={nickname}
          onChange={(event) => setNickname(event.currentTarget.value)}
          required
        />
      ) : (
        <p className={styles.profileData}>{nickname}</p>
      )}

      <label htmlFor="description">Description</label>
      {showInput ? (
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
      ) : (
        <p className={styles.profileData}>{description}</p>
      )}

      <Select
        className={styles.select}
        closeMenuOnSelect={false}
        components={categoriesOption}
        defaultValue={[categoriesOption[4], categoriesOption[5]]}
        isMulti
        options={categoriesOption}
      />

      {showInput ? (
        <button
          className={styles.buttonCreate}
          onClick={async () => {
            // router.push('/yourprofile');
            await create({ setShowInput, userId, nickname, description });
            // router.refresh();
          }}
        >
          Create
        </button>
      ) : (
        <button
          className={styles.buttonEdit}
          onClick={() => setShowInput(true)}
        >
          Edit
        </button>
      )}
    </form>
  );
}
