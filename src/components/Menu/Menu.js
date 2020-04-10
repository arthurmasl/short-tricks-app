import React from 'react';
import './Menu.style.scss';
import '../Icons/Icons.style.scss';
import { Switch, Route } from 'react-router-dom';
import MenuDropdown from './MenuDropdown';
import MenuBackToMain from './MenuBackToMain';
import MenuBackToImport from './MenuBackToImport';
import MenuBackToCategory from './MenuBackToCategory';

const Menu = () => {
  return (
    <Switch>
      <Route exact path="/" component={MenuDropdown} />
      <Route exact path="/create" component={MenuBackToMain} />

      <Route path="/create/:id" component={MenuBackToImport} />
      <Route path="/:category/:item" component={MenuBackToCategory} />
      <Route path="/:category" component={MenuBackToMain} />
    </Switch>
  );
};

export default Menu;
