import React from 'react';
import './Create.style.scss';
import { useDispatch, useSelector } from 'react-redux';

import { createItem } from '../../actions/createItem';
import { selectCreateLoading } from '../../slices/storeSlice';
import { selectForm } from '../../slices/creatorSlice';

const Create = () => {
  const isCreating = useSelector(selectCreateLoading);
  const dispatch = useDispatch();

  const { category, name } = useSelector(selectForm);

  const disabled = !category.trim().length || !name.trim().length;

  const createHandler = () => {
    dispatch(createItem);
  };

  return (
    <React.Fragment>
      <div className="create-wrapper">
        {isCreating && <div className="loading-bar"></div>}
        <button
          className="create"
          onClick={createHandler}
          disabled={isCreating || disabled}
        >
          Create
        </button>
      </div>
    </React.Fragment>
  );
};

export default Create;
