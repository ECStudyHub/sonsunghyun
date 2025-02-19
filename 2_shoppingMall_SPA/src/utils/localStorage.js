export function getItemFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
}

export function setItemFromLocalStorage(key, data) {
  const value = JSON.stringify(data);
  localStorage.setItem(key, value);
}

export function removeItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}