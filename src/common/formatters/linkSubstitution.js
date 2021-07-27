// URL이나 이메일, 전화번호를 링크로 만들어주는 메소드
const linkSubstitution = (content) => {
  // 검사를 위한 정규식
  const emailReg = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gim; // eslint-disable-line max-len
  const URLReg = /(@)?((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?)/gi; // eslint-disable-line max-len
  const httpHttpsReg = /^(?:http|https)\b/;
  const phoneNumReg = /\d{2,4}-\d{3,4}-\d{3,4}/gm;

  // 이메일을 검사 후 치환하는 과정
  const firstReplace = content.replace(emailReg, email => `<a href="mailto:${email}">${email}</a>`);

  // url을 검사 후 치환하는 과정
  const secondReplace = firstReplace.replace(URLReg, (fullURL, atSign) => {
    // 만약 이메일이라면 치환하지 않음
    if (atSign) {
      return fullURL;
    }

    // 앞에 http나 https가 붙어 있지 않다면 붙여서 치환
    if (!httpHttpsReg.test(fullURL)) {
      return `<a href="http://${fullURL}" target="_blank">${fullURL}</a>`;
    }

    // 나머지는 치환
    return `<a href="${fullURL}" target="_blank">${fullURL}</a>`;
  });

  // 전화번호를 검사 후 치환하는 과정
  const thirdReplace = secondReplace.replace(phoneNumReg, phoneNum => `<a href="tel:${phoneNum}">${phoneNum}</a>`);

  return thirdReplace;
};

export default linkSubstitution;
