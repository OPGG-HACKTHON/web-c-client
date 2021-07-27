import React from 'react';
import PropTypes from 'prop-types';

import './PublicLayout.scss';

const PublicLayout = ({
  children,
}) => {
  return (
    <div className="PublicLayout">
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

PublicLayout.propTypes = {
  children: PropTypes.node,
};

export default PublicLayout;
