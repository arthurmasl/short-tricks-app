import React, { useEffect } from 'react';
import './Categories.style.scss';
import Title from '../Title/Title';
import { getCategories } from '../../actions/getCategories';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectFilteredCategories,
} from '../../slices/storeSlice';
import CategoriesItem from './CategoriesItem';
import { toggleFilter, selectFilter } from '../../slices/interfaceSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectFilteredCategories);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  const filterHandler = () => {
    dispatch(toggleFilter());
  };

  return (
    <React.Fragment>
      <Title
        text="Categories"
        button={<button onClick={filterHandler}>{filter}</button>}
      />

      <div className="categories">
        {categories.map((category, i) => (
          <CategoriesItem key={category._id} {...category} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default React.memo(Categories);
