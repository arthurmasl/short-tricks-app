import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from 'react-autocomplete';
import { useHistory } from 'react-router-dom';
import { setForm } from '../../slices/creatorSlice';

const SearchDefault = ({
  icon,
  placeholder,
  optionsSelector,
  push,
  label,
  name
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const options = useSelector(optionsSelector);

  const searchFilter = (item, value) =>
    value.length > 0 && item.label.toLowerCase().includes(value.toLowerCase());

  const changeHadler = e => {
    setValue(e.target.value);

    if (name) {
      dispatch(setForm({ name, value: e.target.value }));
    }
  };

  const selectHandler = val => {
    if (push) {
      history.push(val);
    } else {
      setValue(val);
      if (name) {
        dispatch(setForm({ name: name, value: val }));
      }
    }
  };

  const plCn = icon ? 'pl' : '';
  const inputCn = label ? 'input-wrapper' : '';

  return (
    <div className={`search-wrapper ${inputCn}`}>
      {icon && <div className="search-icon" />}
      {label && <label>{label}</label>}

      <div className={`autocomplete-wrapper ${plCn}`}>
        <Autocomplete
          inputProps={{
            placeholder,
            className: 'input input-search'
          }}
          getItemValue={item => item.label}
          shouldItemRender={searchFilter}
          value={value}
          onChange={changeHadler}
          onSelect={selectHandler}
          items={options}
          renderMenu={items =>
            items.length ? (
              <div className="autocomplete-menu" children={items} />
            ) : (
              <div className="autocomplete-empty"></div>
            )
          }
          renderItem={AutocompleteItem}
        />
      </div>
    </div>
  );
};

const AutocompleteItem = (item, isHighlighted) => (
  <div
    className={`autocomplete-item ${isHighlighted ? 'selected' : ''}`}
    key={item.label}
  >
    {item.label}
  </div>
);

export default SearchDefault;
