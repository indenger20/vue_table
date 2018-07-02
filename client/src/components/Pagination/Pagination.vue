<template>
  <b-pagination @change="changeHandle" size="md" :total-rows="100" v-model="currentPageLocal" :per-page="pagesLocal"></b-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: Number,
    pages: Number,
    changePage: Function
  },
  data() {
    return {
      currentPageLocal: this.currentPage,
      pagesLocal: this.pages
    };
  },
  methods: {
    changeHandle(index) {
      this.changePage(index);
    }
  },
  watch: {
    currentPage() {
      this.currentPageLocal = this.currentPage;
    }
  },
  computed: {}
};
</script>

