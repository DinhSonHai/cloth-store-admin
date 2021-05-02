import React, { useEffect, useState, useRef } from 'react';
import { DropDown } from '../../../assets/icons';
// import PropTypes from 'prop-types';

import './styles.scss';

SelectBox.propTypes = {

};

function SelectBox({ handleSort, sortState, setSortState }) {
  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef();

  const handleOpen = () => {
    setOpen(!isOpen);
  }

  const handleSelect = (type) => {
    setOpen(false);
    handleSort(type);
  }

  const close = (e) => {
    const { target } = e;
    if (!wrapperRef?.current?.contains(target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('click', close)
    }
  }, []);

  return (
    <div className="select-box" ref={wrapperRef}>
      <div className="select" onClick={handleOpen}>
        <p className="type">{sortState === 'date' && 'Date Added'}{sortState === 'profit' && 'Profit'}</p>
        <span className={isOpen ? "rotate" : ""}>
          <DropDown />
        </span>
      </div>
      {isOpen && (
        <div className="option">
          <p onClick={() => handleSelect('date')}>Date Added</p>
          <p onClick={() => handleSelect('profit')}>Profit</p>
        </div>
      )}
    </div>
  );
}

export default SelectBox;
