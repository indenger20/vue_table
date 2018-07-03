
import { formatUSD } from '../../helpers/utils';

export default {
  name: 'Products',
  data() {
    return {
      
    }
  },
  methods: {
    addOrder(product) {
      this.$store.dispatch('orders/create', product);
    },
    formatPrice(value) {
      return formatUSD(+value);
    },
    getProductInfo(product_id) {
      this.$store.commit('document/getInformation', product_id)
    }
  },
  computed: {
    products() {
      return this.$store.state.document.products;
    },
    isAuth() {
       return this.$store.state.user.user ? true : false;
    },
    orders() {
      return this.$store.state.orders.orders;
    }
  },
}