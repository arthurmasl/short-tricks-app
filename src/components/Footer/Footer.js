import React from 'react';
import './Footer.style.scss';

import { Switch, Route } from 'react-router-dom';
import FooterCreate from './FooterCreate';
import FooterPlayer from './FooterPlayer';

const Footer = () => {
  return (
    <Switch>
      <Route path="/create/:id" component={FooterCreate} />
      <Route path="/:category/:id" component={FooterPlayer} />
    </Switch>
  );
};

export default Footer;
