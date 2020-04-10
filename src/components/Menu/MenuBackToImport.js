import React from 'react';

import { useHistory } from 'react-router-dom';

const MenuBackToImport = () => {
  const history = useHistory();

  const backHandler = target => {
    history.push(target);
  };

  return (
    <button
      className="menu icon-menu icon-back"
      onClick={() => backHandler('/create')}
    />
  );
};

export default MenuBackToImport;
