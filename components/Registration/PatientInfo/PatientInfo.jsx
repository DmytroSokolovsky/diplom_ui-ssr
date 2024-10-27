import { useCallback, useContext, useEffect, useState } from 'react';
import s from './PatientInfo.module.scss';
import cn from 'classnames'
import { UserIdContext } from './../../../context/UserIdContext';

function PatientInfo({ patientName, setPatientName, patientPhone, setPatientPhone, handleDataInput }) {
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const userId = useContext(UserIdContext);

  const validateName = useCallback(() => {
    setIsNameValid(patientName.trim() !== '');
  }, [patientName]);

  const validatePhone = useCallback(() => {
    const phoneRegex = /^380\d{9}$/;
    setIsPhoneValid(phoneRegex.test(patientPhone));
  }, [patientPhone]);

  useEffect(() => {
    validateName();
    validatePhone();
    handleDataInput();
  }, [patientName, patientPhone, handleDataInput, validateName, validatePhone]);

  const handleChangeName = (e) => {
    setPatientName(e.target.value);
  }

  const handleChangePhone = (e) => {
    setPatientPhone(e.target.value);
  }

  let blockClass = cn(s.info__block, {
    [s.browser]: !userId,
  });

  return (
    <div className={s.info}>
      <h1 tabIndex={0} className={s.info__title}>Запис</h1>
      <div className={blockClass}>
        <label>
          <span>ПІБ:</span>
          <input
            placeholder="ПІБ"
            type="text"
            value={patientName}
            onChange={handleChangeName}
            onBlur={validateName}
            required
          />
          {!isNameValid && <p tabIndex={0}>Поле обов'язкове до заповнення</p>}
        </label>
      </div>
      <div className={blockClass}>
        <label>
          <span>Номер телефону:</span>
          <input
            placeholder="Номер телефону"
            type="tel"
            value={patientPhone}
            onChange={handleChangePhone}
            onBlur={validatePhone} 
            required
          />
          {!isPhoneValid && <p tabIndex={0}>Формат повинен бути 380 ХХ ХХХХХХХ</p>}
        </label>
      </div>
    </div>
  );
}

export default PatientInfo;