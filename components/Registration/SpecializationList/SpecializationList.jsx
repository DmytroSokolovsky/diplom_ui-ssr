import { useContext, useState } from 'react';
import cn from 'classnames';
import s from './SpecializationList.module.scss';
import { UserIdContext } from './../../../context/UserIdContext';

function SpecializationList({ specializations, handleClickSpecialization }) {
  const [activeSpecialization, setActiveSpecialization] = useState(null);
  const userId = useContext(UserIdContext);

  const onClickSpecialization = (specialization) => {
    setActiveSpecialization(specialization);
    handleClickSpecialization(specialization);
  };

  let itemClass = cn(s.specialization__item, {
    [s.browser]: !userId,
  });

  return (
    <div className={s.specialization}>
      <h2 tabIndex={0} className={s.specialization__title}>Оберіть спеціалізацію:</h2>
      <ul className={s.specialization__list} role="list">
        {specializations.map((specialization, index) => (
          <li
            key={specialization}
            onClick={() => onClickSpecialization(specialization)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClickSpecialization(specialization);
              }
            }}
            tabIndex={0} 
            role="button" 
            className={cn(itemClass, {
              [s.specialization__item_active]: specialization === activeSpecialization,
              [s.browser_active]: specialization === activeSpecialization,
            })}
            aria-pressed={specialization === activeSpecialization} 
            aria-label={`Оберіть спеціалізацію ${specialization}`} 
          >
            {specialization}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpecializationList;
