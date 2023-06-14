'use client';

import './globals.scss';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Nav from './components/Nav';
import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Web Application',
//   description: 'Communicating with others',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openModal, setOpenModal] = useState(false);

  const background = openModal ? styles.overlay : '';

  return (
    <html lang="en">
      <body className={background}>
        <Nav setOpenModal={setOpenModal} />
        <div className={styles.popup}>
          {openModal && <Modal closeModal={setOpenModal} />}
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
