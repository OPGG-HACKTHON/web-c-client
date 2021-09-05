import React from 'react';
import Header from './Header';
import SummonaryInfoContainer from './SummonaryInfoContainer';

import './TopContainer.scss';

const TopContainer = () => {
  return (
    <div className="Top-Container">
      <Header />
      <SummonaryInfoContainer />
    </div>
  );
};

export default TopContainer;
