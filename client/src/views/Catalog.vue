<template>
  <div>
    <h1>Catalog</h1>
    <div class="content">
      <div class="content__aside">
        <aside>
          <Filters />
        </aside>
      </div>
      <div class="content__main">
        <Products />
        <Pagination :pages="pages" :currentPage="page" :changePage="changePage" :limit="limit" />
      </div>
    </div>
  </div>
</template>

<script>
import Products from "@/components/Products/Products.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Filters from "@/components/Filters/Filters.vue";

export default {
  name: "catalog",
  components: {
    Products,
    Pagination,
    Filters
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
    },
    limit() {
      return this.$store.state.document.limit;
    }
  },
};
</script>
