import './globals.scss';
// import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { getUserBySessionToken, getUsersById } from '../database/users';
import { UserEntity } from '../migrations/1686751602-createTableUsers';
// import Footer from './components/Footer';
import Nav from './components/Nav';

// import styles from './page.module.scss';

// const inter = Inter({ subsets: ['latin'] });

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

  const user: UserEntity | undefined = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const userId = user?.id;
  const singleUserData: any = await getUsersById(userId);

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
