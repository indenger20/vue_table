export default {
  name: 'Products',
  data() {
    return {
      
    }
  },
  methods: {
    addOrder(product) {
        this.$store.dispatch('orders/add', product.id);
    }
  },
  computed: {
    products() {
      return this.$store.state.document.products;
    }
  },
}