<template>
  <div id="app">
    <div class="container">
      <b-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item to="/login">Login</b-nav-item>
      </b-nav>
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      
    };
  },
  
  created() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
