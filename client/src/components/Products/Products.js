
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