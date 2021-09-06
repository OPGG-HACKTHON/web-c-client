import React, { useState, useEffect } from 'react';
import { Modal, Checkbox, Button } from 'antd';
import { detect } from 'detect-browser';

import { setLocalStorageWithoutCheck, getLocalStorage } from '@/common/utils/localStorageHandler';

const BrowserWarning = () => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(true);
  const browser = detect();

  useEffect(() => {
    if (!browser || !['edge', 'ie'].includes(browser.name) || getLocalStorage('swoomi-browser-warning')) {
      return;
    }

    setVisible(true);
  }, []);

  return (
    <Modal
      title="브라우저 이용 안내"
      visible={visible}
      closable={false}
      footer={(
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Checkbox checked={checked} onChange={({ target }) => setChecked(target.checked)}>다시 보지 않기</Checkbox>
          <div>
            <Button
              type="primary"
              onClick={() => {
                if (checked) {
                  setLocalStorageWithoutCheck('swoomi-browser-warning', 'on');
                }
                setVisible(false);
              }}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    >
      <p>
        스우미는 크롬 브라우저에 최적화되어 있습니다. <br />
        원활한 서비스 이용을 위해 크롬 브라우저 이용을 추천드립니다.
      </p>
      <a href="https://www.google.com/intl/ko/chrome/" target="_blank" rel="noopener noreferrer">크롬 브라우저 다운로드</a>
    </Modal>
  );
};

export default BrowserWarning;
