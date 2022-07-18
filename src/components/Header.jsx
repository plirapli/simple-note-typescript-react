const Header = (props) => {
  return (
    <header>
      <h1>Notes</h1>
      <input className='searchBar' type='text' value={props.keyword} />
    </header>
  );
};

export default Header;
