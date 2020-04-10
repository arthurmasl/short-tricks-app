import React, { useEffect } from 'react';
import './Creator.style.scss';
import Trimmer from '../Trimmer/Trimmer';
import Title from '../Title/Title';
import SearchDefault from '../Search/SearchDefault';
import {
  selectCategiriesOptions,
  selectItemsOptions,
} from '../../actions/selectOptions';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../actions/getCategories';

const Creator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  return (
    <div className="creator">
      <Trimmer />
      <Title
        mb
        text="Trim video"
        subtext="Select the short video gap, up to 10 seconds"
      />
      <Title text="Describe item" />
      <SearchDefault
        placeholder="Category"
        optionsSelector={selectCategiriesOptions}
        label="Select exist category or create a new"
        name="category"
      />
      <SearchDefault
        placeholder="Name"
        optionsSelector={selectItemsOptions}
        label="Indicate name of the item"
        name="name"
      />
    </div>
  );
};

export default Creator;
