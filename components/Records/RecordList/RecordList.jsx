import RecordItem from '../RecordItem/RecordItem';
import s from './RecordList.module.scss'

function RecordList({ records, onDelete, errorMessage }) {
  if (errorMessage) {
    return null; 
  }

  return (
    <>
      <div className={s.records} role="region" aria-labelledby="records-title">
        <h2 tabIndex={0} id="records-title" className={s.records__title}>Ваші записи</h2>
        <div className={s.records__list} role="list">
          {records.length > 0 ? (
            records.map(record => (
              <div role="listitem" key={record._id}>
                <RecordItem record={record} onDelete={onDelete} />
              </div>
            ))
          ) : (
            <p className={s.records__no} role="alert">Записи відсутні</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RecordList;

