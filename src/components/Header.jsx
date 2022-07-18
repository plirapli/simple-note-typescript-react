import '../assets/style/style.css';

const Header = (props) => {
  return (
    <header>
      <h1>Notes</h1>
      <input
        onChange={props.search}
        className='searchBar'
        type='text'
        value={props.input}
        placeholder='Cari catatan...'
      />
    </header>
  );
};

export default Header;
