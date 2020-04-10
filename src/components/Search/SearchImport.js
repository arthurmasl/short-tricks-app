import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  setIsLoading,
  selectIsLoading,
  setForm,
} from '../../slices/creatorSlice';
import { setVideoId } from '../../slices/playerSlice';
import { downloadRequest } from '../../actions/download';
import { useDispatch, useSelector } from 'react-redux';
import { isDev } from '../../utils/api';

const debug = false;

const SearchImport = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(selectIsLoading);

  const importSearchHandler = async (e) => {
    const { value } = e.target;

    // DEBUG
    if (
      debug ||
      value.includes('youtube.com/watch?v=') ||
      value.includes('youtu.be/')
    ) {
      dispatch(setIsLoading(true));

      const { id } = !debug
        ? await downloadRequest(value)
        : await downloadRequest(
            'https://www.youtube.com/watch?v=NpKYvL5hjF0&t=9s'
          );

      dispatch(setForm({ name: 'originalVideo', value }));
      dispatch(setVideoId(id));
      dispatch(setIsLoading(false));

      // const regex = value.match(/t=(\d)+/gi);

      history.push(`/create/${id}`);
    }
  };

  return (
    <div className="search-wrapper search-import-wrapper">
      <div className="search-icon" />
      <input
        autoComplete="off"
        className="input search-input"
        type="text"
        placeholder="Youtube url"
        onChange={importSearchHandler}
        disabled={isLoading}
      />
      {isLoading && <div className="loading-bar"></div>}
    </div>
  );
};

export default SearchImport;
