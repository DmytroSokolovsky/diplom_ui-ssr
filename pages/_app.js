import Script from 'next/script';
import { useEffect, useState } from "react";
import './../styles/global.scss';
import s from './../styles/global.module.scss';
import { UserIdContext } from '../context/UserIdContext';
import { ModalContext } from '../context/ModalContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [userId, setUserId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      let id = params.get('user_id');
      
      if (id) {
        localStorage.setItem('userId', id);
        setUserId(id);
      } else {
        const storedId = localStorage.getItem('userId');
        if (storedId) {
          setUserId(storedId);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      document.body.classList.add('browser');
    } else {
      document.body.classList.remove('browser');
    }
  }, [userId]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/images/doctors.jpg" />
        <meta property="og:type" content="website" />
        <meta name="telegram:webapp" content="Amel Dental Clinic WebApp для легкого керування записами." />
        <meta name="format-detection" content="telephone=no"></meta>
        <meta name="Author" content="Amel Dental Clinic"></meta>
        <meta name="Copyright" content="Amel Dental Clinic"></meta>
        <meta name="Address" content="м. Дніпро, бул. Слави, 2-Б, ж/м Перемога-5"></meta>
        <meta name="robots" content="index, follow"></meta>
      </Head>
      <Script 
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive" 
      />
      <UserIdContext.Provider value={userId}>
        <ModalContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
          <div className={s.wrapper}>
            <Component {...pageProps} userId={userId} />
          </div>  
        </ModalContext.Provider>
      </UserIdContext.Provider>
    </>
  );
}

export default MyApp;
