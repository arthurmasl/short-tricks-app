import React from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPlay } from '../../slices/playerSlice';

const MenuBackToCategory = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const backHandler = () => {
    dispatch(setPlay(false));
    history.push(`/${params.category}`);
  };

  return <button className="menu icon-menu icon-back" onClick={backHandler} />;
};

export default MenuBackToCategory;
