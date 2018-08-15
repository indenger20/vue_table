import DocumentService from '../../services/DocumentService';
import router from '../../router';
import {
  setPaginationToLocalStorage,
  getPaginationFromLocalStorage,
  UpdateQueryString,
  getFilterFromQuery,
  isEmpty,
  sortAlphabetical,
} from "../../helpers/utils";



export default {
  namespaced: true,
  state: {
    products: [],
    page: null,
    pages: null,
    limit: null,
    information: null,
    categories: [],
    makes: [],
    filter: {
      price: [0, 500000],
    },
  },
  mutations: {
    clear(state) {
      state.products = [];
      state.page = null;
      state.pages = null;
      state.limit = null;
      state.filter = { price: [0, 500000] };
    },
    updateProducts(state, products) {
      state.products = products;
    },
    updateCategories(state, categories) {
      state.categories = categories;
    },
    updatePagination(state, pagination) {
      setPaginationToLocalStorage(pagination);
      if (pagination) {
        state.page = pagination.page;
        state.pages = pagination.pages;
        state.limit = pagination.limit;
      }
    },
    updateMakes(state, makes) {
      state.makes = makes.sort((a, b) => sortAlphabetical(a.title, b.title));
    },
    inCart(state, product_id) {
      const products = state.products.map(p => {
        if (p.id === product_id) {
          p.inCart = true;
        }
        return p;
      })
      state.products = products;
    },
    fromCart(state, product_id) {
      const products = state.products.map(p => {
        if (p.id === product_id) {
          p.inCart = false;
        }
        return p;
      })
      state.products = products;
    },
    setInformation(state, info) {
      state.information = info;
    },
    getInformation(state, product_id) {
      router.push({ path: 'productInfo', query: { product_id } });
    },
    updateFilter(state) {
      const newFilter = getFilterFromQuery();
      state.filter = !isEmpty(newFilter) ? newFilter : state.filter;
    },
    resetSlider(state) {
      state.filter = { price: [0, 500000] };
    }
  },
  actions: {
    async getProducts({ commit }, pageCount) {
      let pagination = getPaginationFromLocalStorage();
      const { products } = await DocumentService.getProducts(pageCount || pagination ? pagination.page : 1);
      if (pagination) {
        pagination = {
          ...pagination,
          page: pageCount || pagination.page,
        };
      }

      commit('updateProducts', products);
      commit('updatePagination', pagination);
    },

    async getList({ commit }) {
      let pagination = getPaginationFromLocalStorage();
      const { pages, makes, products, categories } = await DocumentService.getFullList(pagination ? pagination.page : 1);

      if (pagination) {
        pagination = {
          ...pagination,
          pages: pages.pages,
          limit: pages.limit,
        };
      } else {
        pagination = {
          page: 1,
          pages: pages.pages,
          limit: pages.limit,
        };
      }

      commit('updateProducts', products);
      commit('updateCategories', categories);
      commit('updatePagination', pagination);
      commit('updateMakes', makes);
      commit('updateFilter');
    },

    async getInformation({ commit }, product_id) {
      const info = await DocumentService.getInformation(product_id);
      commit('setInformation', info);
    },

    async updateFilter({ commit }, data) {
      let url = null;
      for (const key in data) {
        url = UpdateQueryString(key, data[key], url);
      }
      window.history.replaceState({}, '', url);
      let pagination = getPaginationFromLocalStorage();
      const { products, pages } = await DocumentService.getProducts(pagination.page);
      pagination = {
        page: 1,
        limit: pages.limit,
        pages: pages.pages
      };

      commit('updatePagination', pagination);
      commit('updateFilter');
      commit('updateProducts', products);
    }
  }
}