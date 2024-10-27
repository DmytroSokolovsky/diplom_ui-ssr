import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from "../components/Preloader/Preloader";
import { doctorsAPI } from '../api/doctors-api';

const Doctors = dynamic(() => import('./../components/Doctors/Doctors'), {
  loading: () => <Preloader />,
});

const DoctorsWrapper = ({ doctorsBySpecialization, getDoctorsErrorMessage }) => {
  return (
    <Doctors 
      doctorsBySpecialization={doctorsBySpecialization} 
      getDoctorsErrorMessage={getDoctorsErrorMessage}
    />
  );
};

export async function getServerSideProps() {
  let doctorsBySpecialization = {};
  let getDoctorsErrorMessage;

  try {
    const data = await doctorsAPI.getAll();

    doctorsBySpecialization = data.reduce((acc, doctor) => {
      const specialization = doctor.specialization || "Нема спеціалізації";
      if (!acc[specialization]) {
        acc[specialization] = [];
      }
      acc[specialization].push(doctor);
      return acc;
    }, {});
  } catch (error) {
    getDoctorsErrorMessage = 'Неможливо завантажити інформацію про лікарів';
  }

  return {
    props: {
      doctorsBySpecialization,
      getDoctorsErrorMessage: getDoctorsErrorMessage || null,
    },
  };
}

export default DoctorsWrapper;


