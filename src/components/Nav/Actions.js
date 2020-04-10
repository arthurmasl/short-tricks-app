import React, { useState } from 'react';
import '../Menu/Menu.style.scss';
import './Actions.style.scss';
import { Link } from 'react-router-dom';

const Actions = () => {
  const [state, setState] = useState(false);

  const innerCn = state ? 'visible' : 'hidden';

  const toggleHandler = () => {
    setState(!state);
  };

  return (
    <div className="menu-wrapper visible">
      {state && (
        <div className="menu-inner">
          <Link to="/create">Save</Link>
          <Link to="/create">Edit</Link>
        </div>
      )}
      <button className="actions" onClick={toggleHandler} />

      {state && <div className="menu-background" onClick={toggleHandler} />}
    </div>
  );
};

export default Actions;
