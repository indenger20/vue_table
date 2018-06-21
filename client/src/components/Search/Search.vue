<template>
  
    <form action="#" class="search-form">
        <input type="text" class="form-control" v-model="query" placeholder="Search" v-on:input="handleChange">
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
      this.$store.dispatch("document/searchRecords", this.query);
    }
  }
};
</script>

