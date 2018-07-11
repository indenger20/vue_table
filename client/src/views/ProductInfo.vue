<template>
  <div>
    <h1>About Product</h1>
    <span @click="() => handleBack()" class="back-arrow"></span>
    <div v-html="information" v-if="information !== null"></div>
    <div v-if="information === null">
      <h3>Information is not found</h3>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "productInfo",

  methods: {
    handleBack() {
      router.go(-1);
    }
  },
  computed: {
    information() {
      return this.$store.state.document.information;
    }
  },
  created() {
    const product_id = window.location.href.split('?')[1].split('=')[1];
    this.$store.dispatch("document/getInformation", product_id);
  }
};
</script>
