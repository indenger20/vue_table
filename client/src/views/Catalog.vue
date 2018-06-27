<template>
  <div>
    <h1>Catalog</h1>
    <Products />
  </div>
</template>

<script>
import Products from "@/components/Products/Products.vue";

export default {
  name: "catalog",
  components: {
    Products
  },
  created() {
    if (this.$store.state.document.products.length === 0) {
      this.$store.dispatch("document/getProducts");
    }
  }
};
</script>
