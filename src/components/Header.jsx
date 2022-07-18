const Header = (props) => {
  return (
    <header>
      <h1>Notes</h1>
      <input
        onChange={props.search}
        className='searchBar'
        type='text'
        value={props.input}
      />
    </header>
  );
};

export default Header;
