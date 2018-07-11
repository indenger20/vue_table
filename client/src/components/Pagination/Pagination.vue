<template>
  <b-pagination @change="changeHandle" size="md" :total-rows="pagesLocal * limitLocal" v-model="currentPageLocal" :per-page="9"></b-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: Number,
    pages: Number,
    changePage: Function,
    limit: Number,
  },
  data() {
    return {
      currentPageLocal: this.currentPage,
      pagesLocal: this.pages,
      limitLocal: this.limit,
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
    },
    pages() {
      this.pagesLocal = this.pages;
    },
    limit() {
      this.limitLocal = this.limit;
    }
  },
  computed: {}
};
</script>

