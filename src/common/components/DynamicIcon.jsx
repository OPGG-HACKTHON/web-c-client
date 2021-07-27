// antd v4 에서 dynamic icon 이 사라지며 생긴 문제를 해결하기 위해 도입.
// 아이콘 타입이 정해지지 않은 경우 등의 피치 못할 경우에만 사용하도록 한다.

import loadable from '@loadable/component';

const dynamicIcon = type => loadable(() => import(`@ant-design/icons/es/icons/${type}.js`)
  .catch(err => import('@ant-design/icons/es/icons/WarningOutlined.js')));

export default dynamicIcon;
