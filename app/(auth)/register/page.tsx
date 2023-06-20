import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <main className={styles.signup}>
      <RegisterForm />
    </main>
  );
}
