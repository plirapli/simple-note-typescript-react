import { useState } from 'react';
import { Header, InputForm, NoteList } from './components/_index';
import { getInitialData } from './utils/index';

const App = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [inputSearch, setInputSearch] = useState('');

  const filteredNotes = notes.filter((note) =>
    inputSearch ? note.body.toLowerCase().includes(inputSearch) : note
  );

  const searchHandler = (e) => setInputSearch(e.target.value.toLowerCase());

  const addNoteHandler = ({ title, body }) => {
    setNotes((prev) => [
      ...prev,
      {
        id: +new Date(),
        title,
        body,
        isArchived: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const onClickArchiveHandler = (id) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            isArchived: !note.isArchived,
          };
        }
        return note;
      })
    );
  };

  const onClickDeleteHandler = (id) =>
    setNotes(notes.filter((note) => note.id !== id));

  return (
    <>
      <main>
        <Header search={searchHandler} input={inputSearch} />
        <div className='container'>
          <InputForm addNote={addNoteHandler} />
          <NoteList
            notes={filteredNotes}
            archiveBtnHandler={onClickArchiveHandler}
            deleteBtnHandler={onClickDeleteHandler}
          />
        </div>
      </main>
    </>
  );
};

export default App;
