import Modal from "../Modals/Modal.vue";

export default {
  name: 'Table',
  data() {
    return {
      skill: '',
      fields: ['first_name', 'last_name', 'actions'],
      modalShow: false,
      record: null,
      modalType: null
    }
  },
  methods: {
    closeModal() {
      this.modalShow = false;
    },
    removeRow(record) {
      this.$store.dispatch('deleteRecord', { record });
    },
    editRow(record, type) {
      this.record = record;
      this.modalType = type;
      this.modalShow = true;
    },
    addRow() {
      this.modalType = 'add';
      this.modalShow = true;
    }
  },
  computed: {
    records() {
      return this.$store.state.records;
    }
  },
  components: {
    Modal
  }
}