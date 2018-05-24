import Modal from "../Modals/Modal.vue";

export default {
  name: 'Table',
  data() {
    return {
      skill: '',
      fields: ['first_name', 'last_name', 'actions'],
      modalShow: false,
      records: this.$store.state.records,
      record: null,
      modalType: null
    }
  },
  methods: {
    closeModal() {
      this.modalShow = false;
    },
    removeRow(record) {
      this.$store.commit('deleteRecord', { record });
    },
    editRow(record, type) {
      this.record = record;
      this.modalType = type;
      this.modalShow = true;
    }
  },
  components: {
    Modal
  }
}