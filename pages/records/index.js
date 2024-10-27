import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from './../../components/Preloader/Preloader';
import { recordsAPI } from './../../api/records-api';

const Records = dynamic(() => import('./../../components/Records/Records'), {
  loading: () => <Preloader />,
});

const RecordsWrapper = ({ records, getRecordsErrorMessage }) => {
  return (
    <Records 
      records={records} 
      getRecordsErrorMessage={getRecordsErrorMessage}
    />
  );
};

export async function getServerSideProps(context) {
  const { user_id } = context.query
  let records = [];
  let getRecordsErrorMessage;
  if (user_id) {
    try {
      const data = await recordsAPI.get(user_id);
      records = data;
    } catch (error) {
      getRecordsErrorMessage = 'Неможливо завантажити ваші записи'
    }
  }

  return {
    props: {
      records,
      getRecordsErrorMessage: getRecordsErrorMessage || null,
    },
  };
}

export default RecordsWrapper;