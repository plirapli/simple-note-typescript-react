import { useEffect, useState } from 'react';
import { Header, InputForm, NoteList } from './components/index';
import { getInitialData } from './utils/index';

const App = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  // const searchHandler = () => {
  //   switch (todoType) {
  //     case "completed":
  //       setFilteredTodos(todos.filter(todo => (todo.completed)))
  //       break;
  //     case "uncomplete":
  //       setFilteredTodos(todos.filter(todo => (!todo.completed)))
  //       break;
  //     default:
  //       setFilteredTodos(todos);
  //       break;
  //   }
  // }

  const filterHandler = () => {
    if (inputSearch) {
      setFilteredNotes(() =>
        notes.filter((note) =>
          note.body.toLowerCase().split(' ').includes(inputSearch.toLowerCase())
        )
      );
      // console.log(
      //   notes.filter((note) =>
      //     note.body.toLowerCase().split(' ').includes(inputSearch.toLowerCase())
      //   )
      // );
    } else {
      setFilteredNotes(() => notes);
    }
  };

  const searchHandler = (e) => {
    setInputSearch(e.target.value);
  };

  useEffect(() => {
    filterHandler();
  }, [inputSearch, notes]);

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
  );
};

export default App;
