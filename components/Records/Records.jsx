import { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { useTelegram } from './../../hooks/useTelegram';
import { recordsAPI } from './../../api/records-api';
import RecordList from './../../components/Records/RecordList/RecordList';
import Toast from './../../components/common/Toast/Toast';
import Head from 'next/head';
import Wrapper from '../../components/common/Wrapper/Wrapper';

function Records({ records, getRecordsErrorMessage }) {
  const { tg, onReady, sendDataToTelegram } = useTelegram();

  const [localRecords, setLocalRecords] = useState(records || []);
  const [isOpen, setIsOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [recordsErrorMessage, setRecordsErrorMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(''); 

  useEffect(() => {
    if (getRecordsErrorMessage) {
      setRecordsErrorMessage(getRecordsErrorMessage)
    }
  }, []);

  useEffect(() => {
    onReady();
  }, [onReady]);

  const handleDelete = useCallback(
    async (record) => {
      const { _id, doctor, doctor_id, specialization, date, time, patient_name, patient_phone_number } = record;
      const data = {
        deletedDoctorTelegramId: doctor_id,
        deletedDoctor: doctor,
        deletedSpecialization: specialization,
        deletedPatientName: patient_name,
        deletedPatientPhoneNumber: patient_phone_number,
        deletedRecordDate: date,
        deletedRecordTime: time,
      };

      try {
        await recordsAPI.delete(_id);
        setLocalRecords((prevRecords) => prevRecords.filter((rec) => rec._id !== _id));
        if (tg) {
          sendDataToTelegram(data);
        }
        closeModal();
      } catch (error) {
        setDeleteErrorMessage('Не вдалося видалити запис');
      }
    },
    [sendDataToTelegram, tg]
  );

  useEffect(() => {
    if (deleteErrorMessage) {
      const timer = setTimeout(() => {
        setDeleteErrorMessage(''); 
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [deleteErrorMessage]);

  const openModal = (record) => {
    setRecordToDelete(record);
    setIsOpen(true);
  };

  const closeModal = () => {
    setRecordToDelete(null);
    setIsOpen(false);
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      handleDelete(recordToDelete);
    }
  };

  return (
    <>
      <Head>
        <meta name="description" content="Перегляньте та керуйте своїми записами до лікарів. Видаляйте непотрібні записи та отримуйте повідомлення" />
        <meta name="keywords" content="Записи до лікаря, медичні записи, видалення запису, розклад лікаря" />
        <meta property="og:title" content="Ваші записи до лікаря" />
        <meta property="og:description" content="Перегляньте свої записи до лікарів та керуйте ними" />
        <title>Ваші записи - Amel Dental Clinic</title>
      </Head>
      <Wrapper>
        <>
          <RecordList records={localRecords} onDelete={openModal} errorMessage={recordsErrorMessage} />
        </>
      </Wrapper>
      {isOpen && <Modal onConfirm={confirmDelete} onCancel={closeModal} record={recordToDelete} />}
      {recordsErrorMessage && <Toast errorMessage={recordsErrorMessage} />}
      {deleteErrorMessage && <Toast errorMessage={deleteErrorMessage} />} 
    </>
  );
}

export default Records;