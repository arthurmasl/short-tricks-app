import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesItem = ({ name, items, color }) => {
  const itemStyle = {
    backgroundColor: color
  };

  return (
    <Link to={name} className="categories-item" style={itemStyle}>
      <h4>{name}</h4>
      <h5>{items.length} Items</h5>
    </Link>
  );
};

export default CategoriesItem;
