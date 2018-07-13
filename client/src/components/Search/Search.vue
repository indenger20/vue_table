<template>
  
    <form action="#" class="search-form">
        <input type="text" class="form-control" v-model="query" placeholder="Filter by title" v-on:input="handleChange">
    </form>

</template>

<script>
export default {
  name: "search",

  props: {},
  data() {
    return {
      query: ""
    };
  },
  methods: {
    handleChange(e) {
      this.$store.commit("orders/filterOrders", this.query);
    }
  }
};
</script>

