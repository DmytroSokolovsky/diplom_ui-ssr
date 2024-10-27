import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import s from './Toast.module.scss';

const Toast = ({ errorMessage }) => {
  const [seconds, setSeconds] = useState(0);
  const [isClient, setIsClient] = useState(false); 

  let toastClass = cn(s.toast);

  if (seconds > 0) {
    toastClass = cn(s.toast, {
      [s.open]: true,
    });
  }

  if (seconds >= 2.7) {
    toastClass = cn(s.toast, {
      [s.open]: false,
    });
  }

  useEffect(() => {
    setIsClient(true); 

    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 0.3);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [setSeconds]);

  if (seconds >= 3) return null;

  if (!isClient) return null; 

  return createPortal(
    <div className={toastClass}>
      <span>{errorMessage}</span>
    </div>,
    document.body
  );
};

export default Toast;
