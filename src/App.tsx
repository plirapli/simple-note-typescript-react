import * as React from 'react';
import { Header, InputForm, NoteList } from './components/_index';
import { getDataFromLocalStorage } from './utils/index';

const App: React.FC = () => {
  const STORAGE_KEY = 'NOTES_LIST';
  const [notes, setNotes] = React.useState(getDataFromLocalStorage());
  const [inputSearch, setInputSearch] = React.useState('');

  const filteredNotes = notes.filter((note: { body: string }) =>
    inputSearch ? note.body.toLowerCase().includes(inputSearch) : note
  );

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputSearch(e.target.value.toLowerCase());

  const addNoteHandler = ({ title, body }: { title: string; body: string }) => {
    setNotes((prev: any) => [
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

  const onClickArchiveHandler = (id: number) => {
    interface Notes {
      id: number;
      isArchived: boolean;
    }

    setNotes(
      notes.map((note: Notes) => {
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

  const onClickDeleteHandler = (id: number) => {
    setNotes(notes.filter((note: { id: number }) => note.id !== id));
  };

  React.useEffect(
    () => localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)),
    [notes]
  );

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
