import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import s from './404.module.scss'
import cn from 'classnames'
import { UserIdContext } from '../context/UserIdContext.js';
import Wrapper from '../components/common/Wrapper/Wrapper.jsx';

const Error = () => {
  const [seconds, setSeconds] = useState(5)

  const userId = useContext(UserIdContext);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    }

  }, [router]);

  let errorClass = cn(s.error, {
    [s.browser]: !userId,
  });

  return (
    <>
      <Wrapper>
        <div 
          className={errorClass}
          role="alert"
          aria-live="assertive"
          tabIndex="0"
        >
          Такої сторінки не існує. Через&nbsp;<span aria-live="polite">{seconds}</span>&nbsp;секунд ви будете перенаправлені на головну...
        </div>
      </Wrapper>
    </>
  )
};

export default Error;