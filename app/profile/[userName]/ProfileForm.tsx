'use client';

import { cookies } from 'next/headers';
import { notFound, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Select from 'react-select';
import { getUsersById } from '../../../database/users';
import { Category } from '../../../migrations/1686916405-createTableCategories';
import { CreateResponseBodyPost } from '../../api/(auth)/users/[userId]/route';
import styles from './ProfileForm.module.scss';

type Props = {
  categories: Category[];
  userId: number;
};

interface CategoriesOption {
  readonly value: string;
  readonly label: string;
}

async function create({ userId, nickname, description }) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, nickname, description }),
    });

    if (response.status !== 500) {
      console.log(response);
      const data: CreateResponseBodyPost = await response.json();

      if ('error' in data) {
        console.log({ data });
      }

      if ('data' in data) {
        console.log({ data });
      }
    }
  } catch (e) {
    console.log({ e });
  }
}

export default function ProfileForm(props: Props) {
  const [nickname, setName] = useState('');
  const [description, setDescription] = useState('');

  const categories = props.categories;
  console.log({ categories });

  const userId = props.userId;
  console.log({ props });

  const categoriesOption: readonly CategoriesOption[] = categories.map(
    (category) => {
      return { value: category.name, label: category.label };
    },
  );

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="nickname">Nickname</label>
      <input
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
      </textarea>

      <Select
        className={styles.select}
        closeMenuOnSelect={false}
        components={categoriesOption}
        defaultValue={[categoriesOption[4], categoriesOption[5]]}
        isMulti
        options={categoriesOption}
      />
      <button
        className={styles.buttonCreate}
        onClick={async () => {
          // router.push('/yourprofile');
          await create({ userId, nickname, description });
          // router.refresh();
        }}
      >
        Create
      </button>

      {/* <Link
        className={styles.buttonCreate}
        href="/yourprofile"
        style={{
          textDecoration: 'none',
        }}
      >
        Create
      </Link> */}
    </form>
  );
}
