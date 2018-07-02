<template>
  <div>
    <h1>Catalog</h1>
    <Products />
    <Pagination :pages="pages" :currentPage="page" :changePage="changePage" />
  </div>
</template>

<script>
import Products from "@/components/Products/Products.vue";
import Pagination from "@/components/Pagination/Pagination.vue";

export default {
  name: "catalog",
  components: {
    Products,
    Pagination
  },

  methods: {
    changePage(newPageCount) {
      this.$store.dispatch("document/getProducts", newPageCount);
    }
  },
  computed: {
    page() {
      return this.$store.state.document.page;
    },
    pages() {
      return this.$store.state.document.pages;
    }
  },
  created() {
    if (this.$store.state.document.products.length === 0) {
      this.$store.dispatch("document/getProducts");
    }
  }
};
</script>
