import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/interfaceSlice';
import { host } from '../../utils/api';

const User = () => {
  const user = useSelector(selectUser);

  const clickHandler = () => {
    window.location.replace(`${host}/auth/google`);
  };

  const logOutHandler = () => {
    localStorage.setItem('token', '');
  };

  return (
    <React.Fragment>
      {!user && <button className="user" onClick={clickHandler} />}
      {user && (
        <button className="user">
          <div className="photo-wrapper">
            <img src={user.photo} alt="user" />
          </div>
          {user.status === 'moderator' && <div className="status">M</div>}
        </button>
      )}

      {/* <button onClick={logOutHandler}>log out</button> */}
    </React.Fragment>
  );
};

export default User;
