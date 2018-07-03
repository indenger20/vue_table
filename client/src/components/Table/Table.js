import Modal from "../Modals/Modal.vue";
import { formatUSD } from '../../helpers/utils';

const fields = [
  {
    title: 'Order ID',
    sort: true,
    colspan: 2,
  },
  {
    title: 'Title',
    sort: true,
    colspan: 0,
  },
  {
    title: 'Price',
    sort: true,
    colspan: 0,
  },
  {
    title: 'Actions',
    colspan: 0,
  }
]

export default {
  name: 'Table',
  data() {
    return {
      fields,
      modalShow: false,
      order: null,
      modalType: null,
      dragginIndex: null,
    }
  },
  methods: {
    closeModal() {
      this.modalShow = false;
    },
    removeOrder(order) {
      this.$store.dispatch('orders/removeOrder', { order });
    },
    formatPrice(value) {
      return formatUSD(+value);
    },
    handleDrop(e, dropIndex) {
      this.$store.commit('orders/reorder', { dropIndex, dragginIndex: this.dragginIndex });
      this.dragginIndex = null;
    },
    handleDrag(e, dragginIndex) {
      if (!this.dragginIndex) {
        this.dragginIndex = dragginIndex;
      } else if (this.dragginIndex != dragginIndex) {
        this.dragginIndex = dragginIndex;
      }
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders.orders;
    }
  },
  components: {
    Modal
  }
}