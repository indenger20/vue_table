<template>
   <Table />
</template>

<script>
import Table from "@/components/Table/Table.vue";

export default {
  name: "more",
  components: {
    Table
  },
  created() {
    this.$store.dispatch("document/getAllRecords");
  }
};
</script>
