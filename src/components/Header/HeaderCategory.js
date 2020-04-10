import React from 'react';
import Nav from '../Nav/Nav';
import '../Icons/Icons.style.scss';
import { useSelector } from 'react-redux';
import {
  selectCurrentCategory,
  selectCategoryLikes,
} from '../../slices/storeSlice';
import { useParams } from 'react-router-dom';

const HeaderCategory = () => {
  const { category } = useParams();
  const { name, items, color } = useSelector(selectCurrentCategory(category));

  const likes = useSelector(selectCategoryLikes);

  const colorStyle = { backgroundColor: color };

  return (
    <header className="header header-category" style={colorStyle}>
      <Nav />
      <h1>{name || 'loading..'}</h1>
      <div className="header-counters">
        <span>
          <div className="icon icon-bolt" />
          {items ? items.length : 0} items
        </span>
        <span>
          <div className="icon icon-heart" />
          {likes || 0}
        </span>
      </div>
    </header>
  );
};

export default HeaderCategory;
