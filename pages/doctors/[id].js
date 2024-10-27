import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from '../../components/Preloader/Preloader';
import { doctorsAPI } from './../../api/doctors-api';

const Doctor = dynamic(() => import('./../../components/Doctors/DoctorDetails/DoctorDetails'), {
  loading: () => <Preloader />,
});

const DoctorWrapper = ({ doctorData, doctorErrorMessage }) => {
  return (
    <Doctor 
      doctorData={doctorData} 
      doctorErrorMessage={doctorErrorMessage}
    />
  );
};

export async function getServerSideProps({ params }) {
  let doctorId = params.id;
  let doctorData = [];
  let doctorErrorMessage;

  try {
    const data = await doctorsAPI.getOne(doctorId);
    doctorData = data;
  } catch (error) {
    doctorErrorMessage = 'Неможливо завантажити інформацію про лікаря';
  }

  return {
    props: {
      doctorData,
      doctorErrorMessage: doctorErrorMessage || null,
    },
  };
}

export default DoctorWrapper;