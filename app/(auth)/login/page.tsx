import LoginForm from './LoginForm';
import styles from './page.module.scss';

export default function LoginPage() {
  return (
    <main className={styles.login}>
      <LoginForm />
    </main>
  );
}
