import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Header.style.scss';

import HeaderSearch from './HeaderSearch';
import HeaderImport from './HeaderImport';
import HeaderCategory from './HeaderCategory';
import HeaderPlayer from './HeaderPlayer';
import HeaderEditor from './HeaderEditor';

const Header = () => {
  return (
    <Switch>
      <Route exact path="/" component={HeaderSearch} />
      <Route exact path="/create" component={HeaderImport} />

      <Route path="/create/:id" component={HeaderEditor} />

      <Route path="/:category/:item" component={HeaderPlayer} />
      <Route path="/:category" component={HeaderCategory} />
    </Switch>
  );
};

export default Header;
