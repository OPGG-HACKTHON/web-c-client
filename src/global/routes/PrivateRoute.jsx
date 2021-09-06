import { Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import Loading from '@/common/components/Loading';

import PrivateLayout from '@/global/layout/PrivateLayout';

const PrivateRoute = ({
  component: Component, noHeader, noFooter, ...rest
}) => {
  return (
    <Route
      exact
      {...rest}
      render={props => (
        <PrivateLayout
          noHeader={noHeader}
          noFooter={noFooter}
        >
          <Suspense fallback={<Loading />}>
            <Component {...props} {...rest} />
          </Suspense>
        </PrivateLayout>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any,
  noHeader: PropTypes.bool,
  noFooter: PropTypes.bool,
};

export default PrivateRoute;
