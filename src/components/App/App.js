import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import './App.style.scss';

import Header from '../Header/Header';
import Main from '../Main/Main';

import Footer from '../Footer/Footer';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../actions/getUser';

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = history.location.search;

    if (token) {
      localStorage.setItem('token', token.slice(7));
      history.push('/');
    }
  }, [dispatch, history, history.search]);

  useEffect(() => {
    dispatch(getUser);
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default hot(App);
