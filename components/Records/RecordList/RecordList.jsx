// Імпортуємо компонент RecordItem та стилі з модуля RecordList.module.scss
import RecordItem from '../RecordItem/RecordItem';
import s from './RecordList.module.scss';

// Компонент RecordList для відображення списку записів
function RecordList({ records, onDelete, errorMessage }) {
  // Якщо є повідомлення про помилку, нічого не повертаємо
  if (errorMessage) {
    return null; 
  }

  return (
    <>
      // Основний контейнер для записів з роллю регіону та aria-labelledby для доступності
      <div className={s.records} role="region" aria-labelledby="records-title">
        // Заголовок секції з таб-індексом для доступності
        <h2 tabIndex={0} id="records-title" className={s.records__title}>Ваші записи</h2>
        // Контейнер для списку записів з роллю списку
        <div className={s.records__list} role="list">
          {records.length > 0 ? (
            // Якщо є записи, відображаємо їх за допомогою компонента RecordItem
            records.map(record => (
              <div role="listitem" key={record._id}>
                <RecordItem record={record} onDelete={onDelete} />
              </div>
            ))
          ) : (
            // Якщо записів немає, відображаємо повідомлення
            <p className={s.records__no} role="alert">Записи відсутні</p>
          )}
        </div>
      </div>
    </>
  );
}

// Експортуємо компонент
export default RecordList;


