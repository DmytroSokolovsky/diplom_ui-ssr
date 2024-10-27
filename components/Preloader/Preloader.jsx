import { createPortal } from 'react-dom';
import preloader from './../../images/preloader.gif';
import s from './Preloader.module.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) return null; 

  return createPortal(
    <div className={s.preloader}>
      <Image priority={true} src={preloader} alt="Loading..." />
    </div>,
    document.body,
  );
};

export default Preloader