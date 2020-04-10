import React from 'react';
import './Title.style.scss';

const Title = ({ text, subtext, button, mb }) => {
  const mbCn = mb ? 'margin-bottom' : '';

  return (
    <div className={`title ${mbCn}`}>
      <div className="title-inner">
        <h3>{text}</h3>
        {button}
      </div>
      {subtext && <h4>{subtext}</h4>}
    </div>
  );
};

export default Title;
