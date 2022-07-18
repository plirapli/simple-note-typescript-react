import { useState } from 'react';
import { Header } from './components/index';

const App = () => {
  const [inputSearch, setInputSearch] = useState('');

  const searchHandler = (e) => {
    setInputSearch(() => e.target.value);
  };

  return (
    <main>
      <Header search={searchHandler} input={inputSearch} />
    </main>
  );
};

export default App;
