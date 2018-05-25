<template>
  <b-modal ref="myModalRef" hide-footer v-model="localModalShow" @hidden="closeModal" >
    <div>
      <EditionModal 
        v-if="
          localModalType === 'edit' ||
          localModalType === 'add'
        " 
        :record="record" 
        :closeModal="closeModal"
        :localModalType="localModalType"
      />
    </div>
  </b-modal>
</template>

<script>
import EditionModal from "./EditionModal.vue";

export default {
  name: "modal",
  components: {
    EditionModal
  },
  props: {
    modalShow: Boolean,
    closeModal: Function,
    record: Object,
    modalType: String
  },
  data() {
    return {
      localModalShow: this.modalShow,
      localModalType: this.modalType
    };
  },
  watch: {
    modalShow() {
      this.localModalShow = this.modalShow;
    },
    modalType() {
      this.localModalType = this.modalType;
    }
  }
};
</script>

