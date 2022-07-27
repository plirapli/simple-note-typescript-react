import * as React from 'react'
import { showFormattedDate } from '../utils/index';
import styles from '../assets/style/NoteCard.module.css';

interface Props {
  id: number
  title: string
  body: string
  createdAt: Date
  archive: Function
  modal: Function
}

const NoteCard:React.FC<Props> = (props) => {
  const { id, title, body, createdAt } = props;
  const formattedDate = showFormattedDate(createdAt);

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <h3>{title}</h3>
        <span>{formattedDate}</span>
        <p>{body}</p>
      </article>
      <div className={styles.button_container}>
        <button
          onClick={() => props.archive(id)}
          className={styles.btn_archive}>
          Arsipkan
        </button>
        <button onClick={() => props.modal(id)} className={styles.btn_danger}>
          Hapus
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
