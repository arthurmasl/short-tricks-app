import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchImport from './SearchImport';

import './Input.style.scss';
import './Search.style.scss';
import SearchDefault from './SearchDefault';
import { selectOptions } from '../../actions/selectOptions';

const Search = () => {
  return (
    <Switch>
      <Route exact path="/">
        <SearchDefault
          icon
          placeholder="Search for anything"
          optionsSelector={selectOptions}
          push
        />
      </Route>
      <Route path="/create" component={SearchImport} />
    </Switch>
  );
};

export default Search;
