
module.exports = {
  getAllPagesCount(productsCount, limit) {
    return Math.ceil(productsCount / limit);
  }
};
