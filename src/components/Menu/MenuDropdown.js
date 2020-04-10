import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu, selectMenu, selectUser } from '../../slices/interfaceSlice';

import { Link, useParams } from 'react-router-dom';
import { deleteItem } from '../../actions/deleteItem';
import { likeItem } from '../../actions/likeItem';

const MenuDropdown = ({ right }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const menu = useSelector(selectMenu);
  const user = useSelector(selectUser);

  const menuCn = menu ? 'visible' : 'hidden';
  const rightCn = right ? 'right' : '';

  const actionsIcon = menu ? 'icon-menu' : 'icon-actions';
  const iconCn = right ? actionsIcon : 'icon-menu';

  const toggleHandler = () => {
    dispatch(setMenu());
  };

  const deleteHandler = () => {
    const { category, item } = params;

    toggleHandler();

    if (category && !item) {
      dispatch(deleteItem({ category }));
    }

    if (item) {
      dispatch(deleteItem({ item }));
    }
  };

  const likeHandler = () => {
    toggleHandler();
    dispatch(likeItem());
  };

  const leftItems = (
    <Link to="/create" onClick={toggleHandler}>
      Create Item
    </Link>
  );

  const rightItems = (
    <React.Fragment>
      {params.item && <button onClick={likeHandler}>Like</button>}
      {/* <Link onClick={toggleHandler}>Edit</Link> */}
      {user && user.status === 'moderator' && (
        <button onClick={deleteHandler}>Delete</button>
      )}
    </React.Fragment>
  );

  const items = right ? rightItems : leftItems;

  return (
    <div className={`menu-wrapper ${menuCn} ${rightCn}`}>
      <button className={`menu ${iconCn}`} onClick={toggleHandler} />

      <div className="menu-inner">{items}</div>

      {menu && <div className="menu-background" onClick={toggleHandler} />}
    </div>
  );
};

export default MenuDropdown;
