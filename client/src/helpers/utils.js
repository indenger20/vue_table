export const sortAlphabetical = (a, b) => {
  return a.localeCompare(b);
}
export const formatUSD = (value) => {
  if (value === 0) {
    return value;
  }
  if (!value)
    return null;

  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};


export const setPaginationToLocalStorage = (pagination) => {
  if (pagination) {
    window.localStorage.setItem('pagination', JSON.stringify(pagination));
  }
};

export const getPaginationFromLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem('pagination'));
}