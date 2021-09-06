import React from 'react';
import PropTypes from 'prop-types';

import TopBar from './components/Topbar.tsx';

import './PrivateLayout.scss';

const PrivateLayout = ({
  children,
}) => {
  return (
    <div className="PrivateLayout">
      <TopBar />
      <div id="app-body">
        <div id="app-body-content">
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.node,
};

export default PrivateLayout;
