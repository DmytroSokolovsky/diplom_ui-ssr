import { useContext, useState } from 'react';
import classNames from 'classnames';
import s from './DoctorList.module.scss';
import cn from 'classnames';
import { UserIdContext } from '../../../context/UserIdContext';

function DoctorList({ doctors, handleClickDoctor, selectedSpecialization }) {
  const [activeDoctor, setActiveDoctor] = useState(null);
  const userId = useContext(UserIdContext);

  const onClickDoctor = (doctor) => {
    setActiveDoctor(doctor._id);
    handleClickDoctor(doctor);
  };

  let itemClass = cn(s.doctor__item, {
    [s.browser]: !userId,
  });

  return (
    <div className={s.doctor}>
      <h2 tabIndex={0} className={s.doctor__title}>Лікарі за спеціалізацією {selectedSpecialization}</h2>
      <ul className={s.doctor__list} role="list">
        {doctors.map(doctor => (
          <li
            key={doctor._id}
            onClick={() => onClickDoctor(doctor)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClickDoctor(doctor);
              }
            }}
            tabIndex={0} 
            role="button" 
            className={classNames(itemClass, {
              [s.doctor__item_active]: doctor._id === activeDoctor,
              [s.browser_active]: doctor._id === activeDoctor,
            })}
            aria-pressed={doctor._id === activeDoctor} 
            aria-label={`Оберіть лікаря ${doctor.name}`} 
          >
            {doctor.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;
