<template>
  <div id="app">
    <div class="container">
      <b-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <!-- <b-nav-item to="/cart" v-if="$store.state.user.user">Cart</b-nav-item> -->
        <b-nav-item to="/catalog">Catalog</b-nav-item>
        <b-nav-item to="/login" v-if="!$store.state.user.user">Login</b-nav-item>
        <b-nav-item @click="logout" v-if="$store.state.user.user">Logout</b-nav-item>
      </b-nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import { getToken } from "./helpers/auth";
export default {
  name: "app",
  data() {
    return {};
  },

  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    }
  },

  created() {
    const token = getToken();
    if (this.$store.state.user.user === null && token) {
      this.$store.dispatch("user/login");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.search-form {
  margin-top: 50px;
}
</style>
