import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from '../../components/Preloader/Preloader';
import { registrationAPI } from './../../api/registration-api';

const Registration = dynamic(() => import('./../../components/Registration/Registration'), {
  loading: () => <Preloader />,
});

const RegistrationWrapper = ({ doctorsSpecializations, specializationsErrorMessage }) => {
  return (
    <Registration 
      doctorsSpecializations={doctorsSpecializations} 
      specializationsErrorMessage={specializationsErrorMessage}
    />
  );
};

export async function getServerSideProps(context) {
  let doctorsSpecializations = []
  let specializationsErrorMessage
  try {
    const response = registrationAPI.getSpecializations()
    doctorsSpecializations = await response;
  }
  catch(error) {
    specializationsErrorMessage = 'Помилка під час завантаження спеціалізацій лікарів'
  };
  return {
    props: {
      doctorsSpecializations: doctorsSpecializations || [],
      specializationsErrorMessage: specializationsErrorMessage || null,
    }
  }
}

export default RegistrationWrapper;


