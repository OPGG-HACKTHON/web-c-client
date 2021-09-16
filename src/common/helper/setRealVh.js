const setRealVh = (e, index = 0) => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  if (index < 6) {
    setTimeout(() => setRealVh(e, index + 1), 100);
  }
};

export default setRealVh;
