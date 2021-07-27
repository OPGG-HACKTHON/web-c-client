/* eslint-disable camelcase */

import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import jsCookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

import axios from '@/common/helper/axios';

const getSessionDataFromCookie = () => {
  const refreshToken = jsCookie.get('refresh_token');
  const accessToken = jsCookie.get('access_token');

  return {
    refreshToken,
    accessToken,
  };
};

const removeSessionDataFromCookie = () => {
  jsCookie.remove('refresh_token');
  jsCookie.remove('access_token');
};

const setTokensToCookie = ({ refresh_token, access_token }) => {
  if (refresh_token) jsCookie.set('refresh_token', refresh_token);
  if (access_token) jsCookie.set('access_token', access_token);
};

const getLoginPageURL = () => {
  const { pathname, search } = window.location;

  if (!pathname || !search) {
    return '/login';
  }

  return `/login?redirectUrl=${encodeURIComponent(`${pathname}${search}`)}`;
};

const logout = () => {
  removeSessionDataFromCookie();
  location.href = getLoginPageURL();
};

const validateTokens = ({ refreshToken: refreshTokenFromParam, accessToken: accessTokenFromParam, useCookie = true } = {}) => {
  let refreshToken = refreshTokenFromParam;
  let accessToken = accessTokenFromParam;

  if (useCookie) {
    const tokensFromCookie = getSessionDataFromCookie();
    if (!refreshToken) ({ refreshToken } = tokensFromCookie);
    if (!accessToken) ({ accessToken } = tokensFromCookie);
  }

  if (!refreshToken || !accessToken) {
    return false;
  }
  return true;
};

let lastSession = null;
const logSessionInConsole = (session) => {
  try {
    if (JSON.stringify(lastSession) !== JSON.stringify(session)) {
      const newSession = _.cloneDeep(session);
      console.info('session', newSession);
      lastSession = newSession;
    }
  } catch (e) {
    console.error('session', 'logging error');
  }
};

const sessionHook = () => {
  const [tokens, setTokens] = useState(getSessionDataFromCookie());
  const [session, setSession] = useState({});

  // Client 측에서 session 을 처리하게 되며 cookie 에 저장한 값을 불러오기 전까지 session 에 공백이 생긴다.
  // 이를 표현하기 위해 isLoading 을 도입하였다가, useEffect 특성상 즉각 반영이 되지 않는 문제로 인해 2개로 나누어 상태를 저장한다.
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isSettingCookieLoading, setIsSettingCookieLoading] = useState(true);

  const isLoading = isApiLoading || isSettingCookieLoading;

  const stopApiLoadingAndLogout = useCallback(() => {
    setIsApiLoading(false);
    logout();
  }, []);

  const setTokensFromCookie = useCallback(() => {
    setIsSettingCookieLoading(true);

    if (!validateTokens()) {
      setIsSettingCookieLoading(false);
      return;
    }

    const tokensFromCookie = getSessionDataFromCookie();
    setTokens(tokensFromCookie);
  }, []);

  const InvalidRefreshTokenErrorCode = 10003;
  const refresh = useCallback(async () => {
    setIsApiLoading(true);

    if (!validateTokens()) {
      setIsApiLoading(false);
      return null;
    }
    try {
      const { data } = await axios.get('/v1/token');

      if (!data) {
        stopApiLoadingAndLogout();
        return null;
      }

      if (data.code === InvalidRefreshTokenErrorCode) {
        stopApiLoadingAndLogout();
        return null;
      }
      setTokensToCookie(data.result);
      setTokensFromCookie();
      setIsApiLoading(false);
      return data.result;
    } catch (error) {
      stopApiLoadingAndLogout();
      return null;
    }
  }, []);

  useEffect(() => {
    setTokensFromCookie();
    return () => {
      setIsSettingCookieLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!validateTokens()) return;

    setSession(jwtDecode(tokens.accessToken));
  }, [tokens]);

  useEffect(() => {
    logSessionInConsole(session);
  }, [session]);

  return {
    isLoading,

    methods: {
      validateTokens,
      logout,
      removeSessionDataFromCookie,
      refresh,
      setTokensToCookie,
      setTokensFromCookie,
    },

    session,
    userName: session.name,
    tokens,
  };
};

export default sessionHook;
