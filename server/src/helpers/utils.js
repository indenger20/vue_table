
const createMakesQuery = (makes) => {
  let result = '';
  for (let i = 0; i < makes.length; i++) {
    if (i === makes.length - 1) {
      result += ` make_id = ${makes[i]} `;
    } else {
      result += ` make_id = ${makes[i]} OR `;
    }
  }
  return result;
}

const createPriceQuery = (price) => {
  let result = '';
  result += ` price >= ${price[0]} AND price <= ${price[1]} `;
  return result;
}

module.exports = {
  isEmpty(obj) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }

    return true;
  },
  getAllPagesCount(productsCount, limit) {
    return Math.ceil(productsCount / limit);
  },

  createFilterQuery(query) {
    if (!this.isEmpty(query)) {
      let queryResult = 'WHERE';
      if (query.make) {
        const makes = query.make.split(',');
        queryResult += queryResult.split(' ')[1] ? `AND ${createMakesQuery(makes)}` : `${createMakesQuery(makes)}`;
      }
      if (query.price) {
        const price = query.price.split(',');
        queryResult += queryResult.split(' ')[1] ? `AND ${createPriceQuery(price)}` : `${createPriceQuery(price)}`;
      }
      return `${queryResult};`;
    }
    return ';';
  },
};
