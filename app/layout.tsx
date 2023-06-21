import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserByToken,
  getUsersById,
} from '../database/users';
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

  if (!user) {
    notFound();
  }

  const userId = user.id;

  const singleUserData = await getUsersById(userId);

  if (!user) {
    notFound();
  }

  if (!singleUserData) {
    notFound();
  }

  return (
    <html lang="en">
      <body>
        <Nav user={user} singleUserData={singleUserData} />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
