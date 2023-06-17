import { SetStateAction, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import Login from './Login';
import styles from './Modal.module.scss';
import Signup from './Signup';

export default function Modal({ setOpenModal }) {
  const [currentForm, setCurrentForm] = useState('signup');
  const toggleForm = (formName: SetStateAction<string>) => {
    setCurrentForm(formName);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal()}
        className={styles.closeModalButton}
      >
        <GrFormClose />
      </button>
      {currentForm === 'signup' ? (
        <Signup onFormSwitch={toggleForm} />
      ) : (
        <Login setOpenModal={setOpenModal} onFormSwitch={toggleForm} />
      )}
    </>
  );
}
