import { message } from 'antd';

const addToClipboard = (content, options = {}) => {
  try {
    const tempNode = document.createElement('textarea');
    tempNode.value = content;
    document.body.appendChild(tempNode);
    tempNode.select();
    document.execCommand('copy');
    document.body.removeChild(tempNode);

    if (!options.disableAlert) {
      // message.success("링크 복사를 완료하였습니다.");
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    if (!options.disableAlert) {
      message.error('링크 복사에 실패했습니다. 수동으로 복사해 주세요.');
    }
  }
};

export default addToClipboard;
