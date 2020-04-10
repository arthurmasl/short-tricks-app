import React from 'react';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';

const HeaderSearch = () => {
  return (
    <header className="header">
      <Nav />
      <h1>Hey Guest,</h1>
      <h2>Find a trick you want to train</h2>
      <Search />
    </header>
  );
};

export default HeaderSearch;
