<template>
  <div class="home">

    <Table />
  </div>
</template>

<script>
import Table from '@/components/Table/Table.vue'

export default {
  name: 'home',
  components: {
    Table
  },
  created() {
    this.$store.dispatch('getAllRecords');
  },
}
</script>
