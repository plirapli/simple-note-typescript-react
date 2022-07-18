import { useState } from 'react';
import { Header, InputForm } from './components/index';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  const searchHandler = (e) => {
    setInputSearch(() => e.target.value);
  };

  const addNoteHandler = ({ title, body }) => {
    setNotes((prev) => [
      ...prev,
      {
        id: +new Date(),
        title,
        body,
        isArchived: false,
        createAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <main>
      <Header search={searchHandler} input={inputSearch} />
      <div className='container'>
        <InputForm addNote={addNoteHandler} />
      </div>
    </main>
  );
};

export default App;
