/* eslint-disable react/jsx-filename-extension */
import { hot } from 'react-hot-loader/root';

import React from 'react';
import {
  Redirect, Switch, Router,
} from 'react-router-dom';

import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import 'moment/locale/ko';

import { history } from '@/global/scripts/store';
import sessionHook from '@/common/hooks/session';

import SessionContext from '@/common/context/SessionContext';

import BrowserWarning from '@/global/layout/components/BrowserWarning';

import PublicRoute from '@/global/routes/PublicRoute';

const mainLanding = React.lazy(() => import('@/pages/Landing'));

const App = () => {
  const session = sessionHook();

  return (
    <ConfigProvider locale={koKR}>
      <SessionContext.Provider value={session || {}}>
        <Router history={history}>
          <Switch>
            <PublicRoute exact path="/" component={mainLanding} />
            <Redirect path="*" to="/" />
          </Switch>
        </Router>
        <BrowserWarning />
      </SessionContext.Provider>
    </ConfigProvider>
  );
};

export default hot(App);
