import React from 'react';
import spinner from '../../assets/images/spinner.gif';

export default function Spinner({ width }) {
  return (
    <div className="spinner">
      <img
        src={spinner}
        style={{ width: `${width}`, margin: 'auto', display: 'block' }}
        alt="loading"
      />
    </div>
  );
}