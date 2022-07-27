import { useState } from 'react';
import { NoteCard, DeleteMessage } from './_index.ts';
import styles from '../assets/style/NoteList.module.css';

const NoteList = ({ notes, ...props }) => {
  const [selectedNote, setSelectedNote] = useState({});
  const [showModal, setShowModal] = useState(false);

  const unarchivedNotes = notes.filter((note) => !note.isArchived);
  const archivedNotes = notes.filter((note) => note.isArchived);

  const onClickBackModalHandler = () => {
    setShowModal(false);
  };

  const onClickDeleteModalHandler = (id) => {
    setShowModal(true);
    setSelectedNote(notes.filter((note) => note.id === id)[0]);
  };

  const onClickDeleteHandler = (id) => {
    props.deleteBtnHandler(id);
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.container}>
        <NoteSection
          header='Catatan Aktif'
          notes={unarchivedNotes}
          archive={props.archiveBtnHandler}
          deleteModal={onClickDeleteModalHandler}
        />
        <NoteSection
          header='Arsip'
          notes={archivedNotes}
          archive={props.archiveBtnHandler}
          deleteModal={onClickDeleteModalHandler}
        />
      </div>
      <DeleteMessage
        id={selectedNote.id}
        title={selectedNote.title}
        modal={showModal}
        toggleModal={onClickBackModalHandler}
        delete={onClickDeleteHandler}
      />
    </>
  );
};

const NoteSection = ({ notes, ...props }) => {
  const noteList = () => {
    if (notes.length) {
      return notes.map((note) => (
        <NoteCard
          key={note.id}
          {...note}
          archive={props.archive}
          modal={props.deleteModal}
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
