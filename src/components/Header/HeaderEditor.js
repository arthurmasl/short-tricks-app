import React from 'react';
import Nav from '../Nav/Nav';
import Player from '../Player/Player';

const HeaderEditor = () => {
  return (
    <header className="header">
      <Nav />
      <Player editor />
    </header>
  );
};

export default HeaderEditor;
