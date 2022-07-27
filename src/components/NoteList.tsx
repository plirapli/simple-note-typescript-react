import * as React from 'react';
import { NoteCard, DeleteMessage } from './_index';
import styles from '../assets/style/NoteList.module.css';

interface Props {
  archiveBtnHandler: Function
  deleteBtnHandler: Function
  notes: any
}

const NoteList:React.FC<Props> = ({ notes, ...props }) => {
  const [selectedNote, setSelectedNote] = React.useState({id: 0, title: ''});
  const [showModal, setShowModal] = React.useState(false);

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
