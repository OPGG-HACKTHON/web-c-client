import { useState, useCallback, useContext } from 'react';
import { message } from 'antd';

import axios from '../helper/axios';
import SessionContext from '../context/SessionContext';

const axiosHook = (props = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const reset = useCallback(() => {
    setLoading(null);
    setError(null);
    setResponse(null);
  }, []);
  const { methods: { refresh } } = useContext(SessionContext);

  const retryRequestAfterRefreshToken = async (axiosArgs) => {
    await refresh();
    const res = await axios(axiosArgs);
    return res;
  };

  const request = async (args) => {
    setLoading(true);
    const axiosArgs = args;
    let data;

    try {
      try {
        ({ data } = await axios(axiosArgs));
        if (data.code === 10002) {
          // TODO: 상수로 분리
          throw new Error('로그인 기한이 만료되었습니다. 로그인 화면으로 이동합니다.');
        }
      } catch (err) {
        // token 만료시 refresh 이후 재실행
        try {
          ({ data } = await retryRequestAfterRefreshToken(axiosArgs));
          if (data.code !== 0) {
            throw new Error(data.code);
          }
        } catch (errInRetry) {
          // 그럼에도 실패할 경우 진짜 실패이므로 맨 바깥쪽 catch 로 throw
          throw errInRetry;
        }
      }
      if (data.code === 204) {
        message.error(data.message || '요청하신 내용을 찾을 수 없습니다.');
        return null;
      }

      if (data.code !== 0) {
        throw new Error(data.code);
      }

      setResponse(data);
      if (typeof props.successCallback === 'function') {
        props.successCallback(data);
      }

      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);

      const undefinedErrorMessage = '알 수 없는 문제가 발생하였습니다. 문제가 지속되면 moonyoungyoung@gmail.com 으로 문의바랍니다.';
      const errorMessage = err.message || undefinedErrorMessage;
      setError(errorMessage);

      if (props && props.showErrorMessage) {
        message.error(errorMessage, 3, () => {
          if (typeof props.errorCallback === 'function') {
            props.errorCallback();
          }
        });
      }

      return null;
    }
  };

  return {
    loading,
    request,
    response,
    error,
    axiosReset: () => {
      reset();
    },
  };
};

export default axiosHook;
