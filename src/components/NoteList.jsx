import { NoteCard } from './index';
import styles from '../assets/style/NoteList.module.css';

const NoteList = ({ notes, ...props }) => {
  const unarchivedNotes = notes.filter((note) => !note.isArchived);
  const archivedNotes = notes.filter((note) => note.isArchived);

  return (
    <div className={styles.container}>
      <NoteSection
        header='Catatan Aktif'
        notes={unarchivedNotes}
        delete={props.deleteBtnHandler}
        archive={props.archiveBtnHandler}
      />
      <NoteSection
        header='Arsip'
        notes={archivedNotes}
        delete={props.deleteBtnHandler}
        archive={props.archiveBtnHandler}
      />
    </div>
  );
};

const NoteSection = ({ notes, ...props }) => {
  const noteList = () => {
    if (notes.length) {
      return notes.map((note) => (
        <NoteCard
          key={note.id}
          {...note}
          delete={props.delete}
          archive={props.archive}
        />
      ));
    } else {
      return <>Tidak ada catatan.</>;
    }
  };

  return (
    <section>
      <h2>{props.header}</h2>
      <div className={styles.card_container}>{noteList()}</div>
    </section>
  );
};

export default NoteList;
