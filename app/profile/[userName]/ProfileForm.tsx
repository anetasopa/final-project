'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Creatable from 'react-select';
import { User } from '../../../database/users';
import { Category } from '../../../migrations/1686916405-createTableCategories';
import { CreateResponseBodyPost } from '../../api/(auth)/users/[userId]/route';
import { LoadImage } from './LoadImage';
import styles from './ProfileForm.module.scss';

type Props = {
  categories: Category[];
  userId: number;
  singleUserData: User;
  userCategories: any[];
  setShowInput: boolean;
  idSelectedCategories: any[];
  nickname: string;
  description: string;
  imageUrl: string;
  setSelectedOption: any;
  setUserCategories: any;
  setImageUrl: any;
};

interface CategoriesOption {
  readonly value: string;
  readonly label: string;
}

async function save({
  setSelectedOption,
  setUserCategories,
  setImageUrl,
  setShowInput,
  idSelectedCategories,
  userId,
  imageUrl,
  nickname,
  description,
}: Props) {
  setShowInput(false);
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        userId,
        idSelectedCategories,
        nickname,
        imageUrl,
        description,
      }),
    });

    console.log({ response });
    if (response.status !== 500) {
      const data: CreateResponseBodyPost = await response.json();

      if ('error' in data) {
        console.log(data.error);
      }

      if ('user' in data) {
        setImageUrl(data.user.imageUrl);
        setUserCategories(data.userCategories);
        setSelectedOption(data.userCategories);
        console.log(data);
      }
    }
  } catch (e) {
    console.log({ e });
  }
}

export default function ProfileForm(props: Props) {
  const singleUserData = props.singleUserData;
  const userCategoriesProps = props.userCategories;

  const [selectedOption, setSelectedOption] = useState(userCategoriesProps);
  console.log({ selectedOption });

  const idSelectedCategories = selectedOption?.map((selected) => selected.id);
  const [userCategories, setUserCategories] = useState(userCategoriesProps);
  const [nickname, setNickname] = useState(
    singleUserData.nickname ? singleUserData.nickname : '',
  );
  const [description, setDescription] = useState(
    singleUserData.description ? singleUserData.description : '',
  );
  const [showInput, setShowInput] = useState(true);
  // const [error, setError] = useState<string>('');

  const categories = props.categories;
  const userId = props.userId;

  const categoriesOption: readonly CategoriesOption[] = categories.map(
    (category) => {
      return { id: category.id, value: category.name, label: category.label };
    },
  );

  const [imageUrl, setImageUrl] = useState(
    singleUserData.imageUrl ? singleUserData.imageUrl : '',
  );
  const [uploadData, setUploadData] = useState();

  async function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageUrl(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    const formData = new FormData();

    for (const file of changeEvent.target.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dkanovye3/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageUrl(data.secure_url);
    setUploadData(data);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dkanovye3/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageUrl(data.secure_url);
    setUploadData(data);
  }

  return (
    <div>
      <div className={styles.profileContainer}>
        <div className={styles.imageUsernameContainer}>
          <Image
            alt="userImage"
            src={imageUrl}
            width={300}
            height={300}
            className={styles.userImage}
          />
          <p className={styles.name}>{singleUserData.username}</p>
        </div>
        <LoadImage
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          imageUrl={imageUrl}
          uploadData={uploadData}
          showInput={showInput}
        />
        <form
          className={styles.form}
          onSubmit={(event) => event.preventDefault()}
        >
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
          <p className={styles.interestsTitle}>Interests</p>
          {showInput ? (
            <>
              {userCategories.map((category) => {
                return (
                  <p className={styles.categoriesTitle}>{category.label}</p>
                );
              })}
              <Creatable
                className={styles.select}
                closeMenuOnSelect={false}
                components={categoriesOption}
                onChange={setSelectedOption}
                defaultValue={selectedOption}
                isMulti
                options={categoriesOption}
              />
            </>
          ) : (
            userCategories.map((category) => {
              return <p className={styles.categoriesTitle}>{category.label}</p>;
            })
          )}

          {showInput ? (
            <button
              className={styles.buttonCreate}
              onClick={async () => {
                await save({
                  setSelectedOption,
                  setUserCategories,
                  setImageUrl,
                  setShowInput,
                  imageUrl,
                  idSelectedCategories,
                  userId,
                  nickname,
                  description,
                });
              }}
            >
              Save
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
      </div>
      <Link className={styles.link} href="/list">
        Go to list...
      </Link>
    </div>
  );
}
