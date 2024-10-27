import { useContext, useState } from 'react';
import classNames from 'classnames';
import s from './DateList.module.scss';
import cn from 'classnames';
import { UserIdContext } from './../../../context/UserIdContext';

function DateList({ availableDates, handleSelectDate, selectedDoctor }) {
  const [activeDate, setActiveDate] = useState(null);
  const userId = useContext(UserIdContext);

  const onClickDate = (date) => {
    setActiveDate(date);
    handleSelectDate(date);
  };

  let itemClass = cn(s.date__item, {
    [s.browser]: !userId,
  });

  return (
    <div className={s.date}>
      <h2 tabIndex={0} className={s.date__title}>Доступні дати прийому лікаря {selectedDoctor.name}</h2>
      <ul className={s.date__list} role="list">
        {availableDates.map(slot => (
          <li
            key={slot.day}
            onClick={() => onClickDate(slot.day)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClickDate(slot.day);
              }
            }}
            tabIndex={0} 
            role="button" 
            className={classNames(itemClass, {
              [s.date__item_active]: slot.day === activeDate,
              [s.browser_active]: slot.day === activeDate,
            })}
            aria-pressed={slot.day === activeDate} 
            aria-label={`Оберіть дату ${slot.day}`} 
          >
            {slot.day}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DateList;
