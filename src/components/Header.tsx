import * as React from "react";

interface HeaderProps {
  search: any
  input: string
}

const Header:React.FC<HeaderProps> = ({search, input}) => {
  return (
    <header>
      <h1>Catatan</h1>
      <input
        onChange={search}
        className='searchBar'
        type='text'
        value={input}
        placeholder='Cari catatan...'
      />
    </header>
  );
};

export default Header;
