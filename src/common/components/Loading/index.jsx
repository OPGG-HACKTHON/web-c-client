import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import './index.scss';
import classNames from 'classnames';

const LoadingIndicator = ({ text }) => (
  <div className="LoadingIndicator">
    <div className="container">
      <div className="spinner">
        <div className="dot-holder dot1">
          <div className="shadow" />
          <div className="body" />
        </div>
        <div className="dot-holder dot2">
          <div className="shadow" />
          <div className="body" />
        </div>
        <div className="dot-holder dot3">
          <div className="shadow" />
          <div className="body" />
        </div>
      </div>
      <p className="text">
        {text}
      </p>
    </div>
    <svg className="spinner-svg">
      <defs>
        <filter id="loading-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 50 -5"
            result="loading-filter"
          />
          <feBlend in="SourceGraphic" in2="loading-filter" />
        </filter>
      </defs>
    </svg>
  </div>
);
LoadingIndicator.propTypes = {
  text: PropTypes.string,
};

// TODO: 현재 IE에서 filter 작동 안함. 수정 필요
const Loading = ({
  children,
  isLoading = true,
  text = '잠시만 기다려 주세요...',
}) => {
  return (
    <Spin
      wrapperClassName="LoadingWrapper"
      spinning={isLoading}
      className={classNames('Loading', {
        'no-children': !children,
      })}
      indicator={<LoadingIndicator text={text} />}
    >{children}
    </Spin>
  );
};
Loading.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
};

export default Loading;
