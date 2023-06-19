'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Select from 'react-select';
import { Category } from '../../../migrations/1686916405-createTableCategories';
// import { CreateResponseBodyPost } from '../../api/(auth)/createProfile/route';
import styles from './ProfileForm.module.scss';

type Props = {
  categories: Category[];
};

export default async function ProfileForm(props: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  async function create() {
    const response = await fetch('/api/createProfile', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    });
  }

  //   const data: CreateResponseBodyPost = await response.json();

  //   if ('error' in data) {
  //     setError(data.error);
  //   }

  //   if ('user' in data) {
  //     setError(data.user);
  //   }
  // }

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
      <button
        className={styles.buttonCreate}
        onClick={async () => {
          router.push('/yourprofile');
          await create();
          router.refresh();
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
