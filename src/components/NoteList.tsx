import * as React from 'react';
import { NoteCard, DeleteMessage } from './_index';
import styles from '../assets/style/NoteList.module.css';

interface NoteListProps {
  archiveBtnHandler: Function;
  deleteBtnHandler: Function;
  notes: any;
}

interface NoteSectionProps {
  notes: any;
  header: string;
  archive: Function;
  deleteModal: Function;
}

interface Note {
  id: number;
  title: string;
  body: string;
  isArchived: boolean;
  createdAt: Date;
}

const NoteList: React.FC<NoteListProps> = ({ notes, ...props }) => {
  const [selectedNote, setSelectedNote] = React.useState({ id: 0, title: '' });
  const [showModal, setShowModal] = React.useState(false);

  const unarchivedNotes = notes.filter((note: Note) => !note.isArchived);
  const archivedNotes = notes.filter((note: Note) => note.isArchived);

  const onClickBackModalHandler = () => {
    setShowModal(false);
  };

  const onClickDeleteModalHandler = (id: number) => {
    setShowModal(true);
    setSelectedNote(notes.filter((note: Note) => note.id === id)[0]);
  };

  const onClickDeleteHandler = (id: number) => {
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

const NoteSection: React.FC<NoteSectionProps> = ({ notes, ...props }) => {
  const noteList = () => {
    if (notes.length) {
      return notes.map((note: Note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
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
