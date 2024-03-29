'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import Creatable from 'react-select';
import { UserWithCategory } from '../../../database/users';
import { Category } from '../../../migrations/1686916405-createTableCategories';
import { CreateResponseBodyDelete } from '../../api/(auth)/contacts/[contactId]/route';
import { CreateResponseBodyPut } from '../../api/(auth)/users/[userId]/route';
import { selectedCategoriesId } from './idSelectedCategories';
import { LoadImage } from './LoadImage';
import styles from './ProfileForm.module.scss';

type Props = {
  categories: Category[];
  userId: number;
  singleUserData: {
    nickname: string;
    description: string;
    imageUrl: string;
    username: string;
  };
  userCategories: Category[];
  userContacts: UserWithCategory[];
};

type SaveProps = {
  setSelectedOption: (value: CategoriesOption[]) => void;
  setUserCategories: (value: Category[]) => void;
  setImageUrl: (value: string) => void;
  setShowInput: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  uploadImageOnly: boolean;
  imageUrl: string;
  idSelectedCategories: number[];
  userId: number;
  nickname: string;
  description: string;
};

type CategoriesOption = {
  id: number;
  value?: string; // Make the 'value' property optional
  label: string;
};

interface RemoveParams {
  setUserContacts: (value: UserWithCategory[]) => void;
  userContacts: UserWithCategory[];
  contactId: number;
  setIsLoadingRemove: React.Dispatch<React.SetStateAction<number>>;
}

const findNewContactsLink = () => (
  <Link className={styles.link} href="/list">
    Find new contacts...
  </Link>
);

async function remove({
  setUserContacts,
  userContacts,
  contactId,
  setIsLoadingRemove,
}: RemoveParams) {
  setIsLoadingRemove(contactId);
  try {
    const response = await fetch(`/api/contacts/${contactId}`, {
      method: 'DELETE',
      body: JSON.stringify({ contactId }),
    });

    setIsLoadingRemove(0);

    if (response.status !== 500) {
      const data: CreateResponseBodyDelete = await response.json();
      if ('error' in data) {
        return alert('Could not remove user from the contact list');
      }

      const userContactsNew = userContacts.filter((user) => {
        return user.userId !== contactId;
      });

      setUserContacts(userContactsNew);
    }
  } catch (e) {
    console.log({ e });
  }
}

async function save({
  uploadImageOnly,
  setSelectedOption,
  setUserCategories,
  setImageUrl,
  setShowInput,
  setIsLoading,
  imageUrl,
  idSelectedCategories,
  userId,
  nickname,
  description,
}: SaveProps) {
  setShowInput(false);
  try {
    if (!uploadImageOnly) {
      setIsLoading(true);
    }
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

    setTimeout(() => {
      if (!uploadImageOnly) {
        setIsLoading(false);
        setShowInput(true);
      }
    }, 500);

    if (response.status !== 500) {
      const data: CreateResponseBodyPut = await response.json();

      if ('error' in data) {
        console.log(data.error);
      }

      if ('user' in data) {
        if (data.user.imageUrl) {
          setImageUrl(data.user.imageUrl);
        }
        setUserCategories(data.userCategories);
        setSelectedOption(data.userCategories);
      }
    }
  } catch (e) {
    console.log({ e });
  }
}

export default function ProfileForm(props: Props) {
  const singleUserData = props.singleUserData;
  const userCategoriesProps = props.userCategories;
  const userContactsProps = props.userContacts;

  const [userContacts, setUserContacts] = useState(userContactsProps);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<
    readonly CategoriesOption[]
  >(
    userCategoriesProps.map((category) => {
      return { id: category.id, value: category.name, label: category.label };
    }),
  );

  const idSelectedCategories = selectedCategoriesId(selectedOption);

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
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  console.log({ uploadData });

  async function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      if (onLoadEvent.target) {
        setImageUrl(String(onLoadEvent.target.result));
        setUploadData(undefined);
      }
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
    )
      .then((r) => r.json())
      .catch((error) => {
        console.log({ error });
      });
    setImageUrl(data.secure_url);
    setUploadData(data);
  }

  return (
    <div>
      <div className={styles.profileContainer}>
        <div>
          <Image
            alt="userImage"
            src={imageUrl}
            width={300}
            height={300}
            className={styles.userImage}
          />
        </div>
        <LoadImage
          handleOnChange={async (changeEvent) => {
            setIsImageUploaded(true);
            await handleOnChange(changeEvent);
            setIsImageUploaded(false);
          }}
          showInput={showInput}
          isImageUploaded={isImageUploaded}
        />
        <form
          className={styles.form}
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="nickname">Nickname</label>
          {!showInput ? (
            <input
              data-test-id="profile-nickname"
              id="nickname"
              value={nickname}
              onChange={(event) => setNickname(event.currentTarget.value)}
              required
            />
          ) : (
            <p className={styles.profileData}>{nickname}</p>
          )}

          <label htmlFor="description">Description</label>
          {!showInput ? (
            <textarea
              data-test-id="profile-description"
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
          {!showInput ? (
            <Creatable
              className={styles.select}
              closeMenuOnSelect={false}
              onChange={setSelectedOption}
              defaultValue={selectedOption}
              isMulti
              options={categoriesOption}
            />
          ) : (
            userCategories.map((category) => {
              return (
                <p
                  key={`category-${category.id}`}
                  className={styles.categoriesTitle}
                >
                  {category.label}
                </p>
              );
            })
          )}

          {!showInput ? (
            <button
              className={styles.buttonCreate}
              onClick={async () => {
                await save({
                  uploadImageOnly: false,
                  setSelectedOption,
                  setUserCategories,
                  setImageUrl,
                  setShowInput,
                  setIsLoading,
                  imageUrl,
                  idSelectedCategories,
                  userId,
                  nickname,
                  description,
                });
              }}
            >
              {isLoading ? (
                <div className={styles.spinner}>
                  <div className={styles.loader} />
                </div>
              ) : (
                <p>Save</p>
              )}
            </button>
          ) : (
            <button
              className={styles.buttonEdit}
              onClick={() => setShowInput(false)}
            >
              Edit
            </button>
          )}
        </form>
      </div>
      <h3 className={styles.contactList}>Your contact list</h3>
      <div className={styles.container}>
        <ul className={styles.responsiveTable}>
          <li className={styles.tableHeader}>
            <div className={`${styles.col} ${styles.col1} ${styles.bold}`}>
              Image
            </div>
            <div className={`${styles.col} ${styles.col2} ${styles.bold}`}>
              Username
            </div>
            <div className={`${styles.col} ${styles.col3} ${styles.bold}`}>
              Nickname
            </div>
            <div className={`${styles.col} ${styles.col4} ${styles.bold}`}>
              Description
            </div>
            <div className={`${styles.col} ${styles.col5} ${styles.bold}`}>
              Interests
            </div>
            <div className={`${styles.col} ${styles.col5} ${styles.bold}`}>
              Delete
            </div>
          </li>
          {userContacts.length === 0 ? (
            <div>
              <p>No contacts yet</p>
              {findNewContactsLink()}
            </div>
          ) : null}
          {userContacts.map((followedUser) => {
            return (
              <div key={`user-${followedUser.id}`}>
                <li className={styles.tableRow}>
                  <div
                    className={`${styles.col} ${styles.col1}`}
                    data-label="Image"
                  >
                    <div className={styles.categoriesContainer}>
                      {followedUser.imageUrl ? (
                        <Image
                          alt="userImage"
                          src={followedUser.imageUrl}
                          width={100}
                          height={100}
                          className={styles.profileImg}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col2}`}
                    data-label="Username"
                  >
                    <div className={styles.categoriesContainer}>
                      <Link href="/chat">{followedUser.username}</Link>
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col3}`}
                    data-label="Nickname"
                  >
                    <div className={styles.categoriesContainer}>
                      {!followedUser.nickname ? (
                        <p> - </p>
                      ) : (
                        followedUser.nickname
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col4}`}
                    data-label="Description"
                  >
                    <div className={styles.categoriesContainer}>
                      {!followedUser.description ? (
                        <p> - </p>
                      ) : (
                        followedUser.description
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col5}`}
                    data-label="Interests"
                  >
                    <div className={styles.categoriesContainer}>
                      {followedUser.categories.length > 0 ? (
                        followedUser.categories.map((category) => {
                          return (
                            <p key={`category-${category.id}`}>
                              {category.name}
                            </p>
                          );
                        })
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.col} ${styles.col2} ${styles.addContainer}`}
                    data-label="Delete"
                  >
                    <div>
                      <button
                        onClick={async () => {
                          await remove({
                            setUserContacts,
                            userContacts,
                            contactId: followedUser.userId,
                            setIsLoadingRemove,
                          });
                        }}
                        className={styles.buttonDelete}
                      >
                        {isLoadingRemove === followedUser.userId ? (
                          <div className={styles.spinner2}>
                            <p className={styles.loader2}>Loading...</p>
                          </div>
                        ) : (
                          <CiCircleRemove />
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      {userContacts.length > 0 ? <div>{findNewContactsLink()}</div> : null}
    </div>
  );
}
