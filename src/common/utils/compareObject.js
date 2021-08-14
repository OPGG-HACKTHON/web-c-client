import { transform, isEqual, isObject } from 'lodash';

// https://gist.github.com/Yimiprod/7ee176597fef230d1451#gistcomment-2565071
/**
* object 두 개의 diff 를 검사한다.
 * 정확히 말하면 object 를 기준으로 base 에서 추가되거나 수정된 것을 검사한다.
 * 말인즉슨 base 에서 삭제된 것을 가져오지 않는단 소리.
 * 생각해보니 틀린 방법은 아니다. 삭제된 것을 표현하기도 애매하고..
 * 추후 필요할 경우 deleted 등의 리턴을 추가해볼 것.
 *
 * 깊은 검사를 지원하나, 깊이 검사할 경우에도 object 를 기준으로 base 에서 추가되거나 수정된 것만 검사한다.
 * 깊은 검사시에는 양쪽에 다른 항목이 있을 확률이 높은데, 그리될 경우 효용성이 떨어진다고 판단해 deep 을 끌수 있는 옵션을 추가함.
 *
 *
 * @param {object} object 차이를 비교할 객체
 * @param {object} base 차이를 비교할 바탕 객체
 * @param {bool} deep 두 번째 뎁스의 object 내부까지 깊은 검사할지에 대한 여부
 * @returns
 */
const difference = (object, base, deep = true) => {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      let keyResult = value;
      if (deep) {
        keyResult = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value;
      }
      // eslint-disable-next-line no-param-reassign
      result[key] = keyResult;
    }
  });
};

export default difference;
