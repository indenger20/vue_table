export const sortAlphabetical = (a, b) => {
  return a.localeCompare(b);
}

export const filterRecords = (records, query) => {
  return records.map(r => {
    if (query === '') {
      r.isInView = true;
    } else if (r.first_name.indexOf(query) > -1) {
      r.isInView = true;
    } else {
      r.isInView = false;
    }
    return r;
  })
}