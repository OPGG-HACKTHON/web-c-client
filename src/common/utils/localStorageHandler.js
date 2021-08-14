export const getLocalStorage = key => localStorage.getItem(key) || '';

export const checkIfAlreadyExistedLocalStorage = (key) => {
  if (!localStorage.getItem(key)) {
    return false;
  }
  return true;
};

export const setLocalStorage = (key, value) => {
  if (checkIfAlreadyExistedLocalStorage(key)) {
    return;
  }
  localStorage.setItem(key, value);
};

export const setLocalStorageWithoutCheck = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const parseToInt = (int) => {
  if (!int) {
    return 0;
  }

  return parseInt(int, 10);
};
