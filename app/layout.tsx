import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { getUserBySessionToken, getUserByToken } from '../database/users';
// import Modal from '../app/(auth)/module/Modal';
import Footer from './components/Footer';
import Nav from './components/Nav';
import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Web Application',
//   description: 'Communicating with others',
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <body>
        <Nav user={user} />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
