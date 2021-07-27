export default ({ josa, text }) => {
  const map = {};

  '를/을, 와/과, 는/은, 가/이, 로/으로'
    .trim()
    .split(',')
    .map((v) => { // eslint-disable-line
      const j = v.trim()
        .split('/');
      map[j[0]] = j;
      map[j[1]] = j;
      map[j] = j;
    });

  if (!josa) {
    return '';
  } else if (!text) { // eslint-disable-line
    return '';
  }

  const charCode = text.charCodeAt(text.length - 1) - 44032;
  if (charCode < 0 || charCode > 11171) {
    return josa;
  } else if (charCode % 28 === 0) { // eslint-disable-line
    return map[josa] ? map[josa][0] : '';
  } else {
    return map[josa] ? map[josa][1] : '';
  }
};
