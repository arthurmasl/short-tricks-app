import React from 'react';
import './Nav.style.scss';
import Menu from '../Menu/Menu';
import { useParams } from 'react-router-dom';
import User from './User';
import MenuDropdown from '../Menu/MenuDropdown';

const Nav = () => {
  const params = useParams();

  return (
    <nav className="header-nav">
      <Menu />
      {params.category ? (
        <React.Fragment>
          {/* <h1 className="item-name">{params.item}</h1> */}
          <MenuDropdown right />
        </React.Fragment>
      ) : (
        <User />
      )}
    </nav>
  );
};

export default Nav;
