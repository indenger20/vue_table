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



export const UpdateQueryString = (key, value, url) => {
  if (!url) url = window.location.href;
  const re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi");
  let hash = null;

  if (re.test(url)) {
    if (typeof value !== 'undefined' || value !== null || value === '') {
      if (value === '') {
        return url.replace(re, '');
      }
      return url.replace(re, '$1' + key + "=" + value + '$2$3');
    }
    else {
      hash = url.split('#');
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
      if (typeof hash[1] !== 'undefined' && hash[1] !== null)
        url += '#' + hash[1];
      return url;
    }
  }
  else {
    if (typeof value !== 'undefined' || value !== null || value === '') {
      if (value === '') {
        return url.replace(re, '');
      }
      const separator = url.indexOf('?') !== -1 ? '&' : '?';
      hash = url.split('#');
      url = hash[0] + separator + key + '=' + value;
      if (typeof hash[1] !== 'undefined' && hash[1] !== null)
        url += '#' + hash[1];
      return url;
    }
    else
      return url;
  }
}

export const isEmpty = (obj) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
};


export const createFitlerQuery = ({ makes, selected, price }) => {
  const newVal = selected.map(t => makes.find(m => m.title === t).id);
  const data = {
    make: newVal ? newVal.join(',') : [],
    price: price ? price.join(',') : [0, 500000],
  };
  return data;
}

export const getFilterFromQuery = () => {
  const filterQuery = window.location.search;
  let filter = {};

  if (filterQuery.split('?')[1]) {
    let filterArray = filterQuery.split('?')[1].split('&');
    for (let i = 0; i < filterArray.length; i += 1) {
      const propArr = filterArray[i].split('=');
      filter[propArr[0]] = propArr[1].split(',');
    }
  }

  return filter;
}