<template>
  <div>
    <h1>Cart</h1>
    <Search />
    <Table />
  </div>
</template>

<script>
import Table from "@/components/Table/Table.vue";
import Search from "@/components/Search/Search.vue";

export default {
  name: "cart",
  components: {
    Table,
    Search
  },
};
</script>
