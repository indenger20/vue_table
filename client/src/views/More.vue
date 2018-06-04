<template>
  <div>
    <Search />
    <Table />
  </div>
</template>

<script>
import Table from "@/components/Table/Table.vue";
import Search from "@/components/Search/Search.vue";

export default {
  name: "more",
  components: {
    Table,
    Search
  },
};
</script>
