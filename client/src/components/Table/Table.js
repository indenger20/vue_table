import Modal from "../Modals/Modal.vue";

const fields = [
  {
    title: 'first_name',
    sort: true,
  },
  {
    title: 'last_name',
    sort: true,
  },
  {
    title: 'Actions'
  }
]

export default {
  name: 'Table',
  data() {
    return {
      skill: '',
      fields,
      modalShow: false,
      record: null,
      modalType: null,
      dragginIndex: null
    }
  },
  methods: {
    closeModal() {
      this.modalShow = false;
    },
    removeRow(record) {
      this.$store.dispatch('document/deleteRecord', { record });
    },
    handleAction(record = null, type) {
      this.record = record;
      this.modalType = type;
      this.modalShow = true;
    },
    handleSort(col, type) {
      this.$store.commit('document/sortRecords', { col, type });
    },
    handleDrop(e, dropIndex) {
      this.$store.commit('document/reorder', { dropIndex, dragginIndex: this.dragginIndex });
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
    records() {
      return this.$store.state.document.records;
    }
  },
  components: {
    Modal
  }
}