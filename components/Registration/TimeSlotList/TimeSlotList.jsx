import { useContext, useState } from 'react';
import s from './TimeSlotList.module.scss';
import cn from 'classnames';
import { UserIdContext } from './../../../context/UserIdContext';

function TimeSlotList({ availableSlots, handleSelectSlot, selectedDate, handleFocusSlot, handleBlurSlot }) {
  const [activeSlot, setActiveSlot] = useState(null);
  const userId = useContext(UserIdContext);

  const onClickSlot = (slot) => {
    setActiveSlot(slot);
    handleSelectSlot(slot);
  };

  let itemClass = cn(s.time__item, {
    [s.browser]: !userId,
  });

  return (
    <div className={s.time}>
      <h2 tabIndex={0} className={s.time__title}>Доступні часи прийому {selectedDate}</h2>
      <ul className={s.time__list} role="list">
        {availableSlots.map(slot => (
          <li
            key={slot.time}
            onClick={() => onClickSlot(slot.time)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClickSlot(slot.time);
              }
            }}
            tabIndex={0} 
            role="button" 
            className={cn(itemClass, {
              [s.time__item_active]: slot.time === activeSlot,
              [s.browser_active]: slot.time === activeSlot,
            })}
            aria-pressed={slot.time === activeSlot} 
            aria-label={`Оберіть час ${slot.time}`} 
          >
            {slot.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimeSlotList;
