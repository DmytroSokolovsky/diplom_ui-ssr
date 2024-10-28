// Імпортуємо стилі з модуля RecordItem.module.scss
import s from './RecordItem.module.scss';

// Компонент RecordItem для відображення інформації про запис
function RecordItem({ record, onDelete }) {
  return (
    // Основний контейнер для запису з роллю статті та aria-labelledby для доступності
    <div className={s.record} role="article" aria-labelledby={`record-${record._id}`}>
      // Відображаємо лікаря з таб-індексом для доступності
      <p tabIndex={0}><span>Лікар:</span> {record.doctor}</p>
      // Відображаємо дату з таб-індексом для доступності
      <p tabIndex={0}><span>Дата:</span> {record.date}</p>
      // Відображаємо час з таб-індексом для доступності
      <p tabIndex={0}><span>Час:</span> {record.time}</p>
      // Кнопка для видалення запису з обробником події onClick
      <button 
        className={s.record__delete} 
        onClick={() => onDelete(record)} 
        aria-label={`Видалити запис до лікаря ${record.doctor} на ${record.date} о ${record.time}`} // aria-label для покращення доступності
      >
        Видалити запис
      </button>
    </div>
  );
}

// Експортуємо компонент
export default RecordItem;


