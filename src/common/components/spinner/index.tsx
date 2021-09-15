import React from 'react';

import './index.scss';

const Spinner = ({ className }) => {
  return (
    <div className={['lds-ring', className].join(' ')}><div /><div /><div /><div /></div>
  );
};

export default Spinner;
