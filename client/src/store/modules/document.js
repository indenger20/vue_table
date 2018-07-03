import DocumentService from '../../services/DocumentService';
import router from '../../router';
import {
  setPaginationToLocalStorage,
  getPaginationFromLocalStorage,
} from "../../helpers/utils";



export default {
  namespaced: true,
  state: {
    products: [],
    page: null,
    pages: null,
    limit: null,
    information: null,
  },
  mutations: {
    clear(state) {
      state.products = [];
      state.page = null;
      state.pages = null;
      state.limit = null;
    },
    updateProducts(state, products) {
      state.products = products;
    },
    updatePagination(state, pagination) {
      setPaginationToLocalStorage(pagination);
      if (pagination) {
        state
        state.page = pagination.page;
        state.pages = pagination.pages;
        state.limit = pagination.limit;
      }
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
      router.push({ path: 'productInfo', query: { product_id }});
    }
  },
  actions: {
    async getProducts({ commit }, pageCount) {
      let pagination = getPaginationFromLocalStorage();
      if (pagination) {
        pagination = {
          ...pagination,
          page: pageCount || pagination.page,
        };
      }

      const products = await DocumentService.getProducts(pageCount || pagination ? pagination.page : 1);
      commit('updateProducts', products);
      commit('updatePagination', pagination);
    },
    async getPagesCount({ commit }) {
      const { pages, limit } = await DocumentService.getPagesCount();
      let pagination = getPaginationFromLocalStorage();

      if (pagination) {
        pagination = {
          ...pagination,
          pages,
          limit
        };
      } else {
        pagination = {
          page: 1,
          pages,
          limit
        };
      }

      commit('updatePagination', pagination);
    },
    async getInformation({commit}, product_id) {
      const info = await DocumentService.getInformation(product_id);
      commit('setInformation', info);
    }
  }
}