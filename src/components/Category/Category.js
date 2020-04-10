import React, { useEffect } from 'react';
import './Category.style.scss';
import { useParams } from 'react-router-dom';

import Title from '../Title/Title';

import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../actions/getItems';
import { selectItem, selectFilteredItems } from '../../slices/storeSlice';
import CategoryItem from './CategoryItem';

const Category = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const items = useSelector(selectFilteredItems);
  const item = useSelector(selectItem);

  useEffect(() => {
    dispatch(getItems(params));
  }, [dispatch, params]);

  return (
    <React.Fragment>
      {params.item && item && item.videos && (
        <React.Fragment>
          <Title text={item.name} />
          <div className="item-description">
            {/* <p>videos: {item.videos.length}</p> */}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur sequi amet harum ratione odit mollitia perspiciatis
              reprehenderit, nostrum possimus reiciendis autem ipsum inventore
              eligendi explicabo temporibus dicta, repellendus impedit quis!
            </p>

            <div className="original-video">
              Original video:{' '}
              <a
                href={item.videos[0].originalVideo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="icon icon-youtube"></div>
              </a>
            </div>
          </div>
        </React.Fragment>
      )}

      {params.item ? (
        <Title text={`${params.category} content`} mb />
      ) : (
        <Title text="Category content" mb />
      )}

      {items.map((item, i) => (
        <CategoryItem key={item._id} {...item} index={i + 1} />
      ))}
    </React.Fragment>
  );
};

export default Category;
