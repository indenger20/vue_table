<template>
  <div id="app">
    <header class="header">
      <nav class="header-nav">
        <div class="container">
          <b-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/cart" v-if="$store.state.user.user && $store.state.orders.orders.length">Cart</b-nav-item>
            <b-nav-item to="/catalog">Catalog</b-nav-item>
            <b-nav-item to="/login" v-if="!$store.state.user.user" class="right">Login</b-nav-item>
            <b-nav-item @click="logout" v-if="$store.state.user.user" class="right">Logout</b-nav-item>
          </b-nav>
        </div>
      </nav>
    </header>
    <main class="wrapper">
      <div class="container">
        <router-view />
      </div>
    </main>
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
    this.$store.dispatch("document/getPagesCount");
    if (this.$store.state.user.user === null && token) {
      this.$store.dispatch("user/login");
    }
  }
};
</script>
