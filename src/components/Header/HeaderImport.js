import React, { useEffect } from 'react';
import Search from '../Search/Search';
import Nav from '../Nav/Nav';
import { host } from '../../utils/api';

const HeaderImport = () => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.replace(`${host}/auth/google`);
    }
  }, []);

  return (
    <header className="header">
      <Nav />
      <h1>Create new item</h1>
      <h2>Import your video</h2>
      <Search />
    </header>
  );
};

export default HeaderImport;
