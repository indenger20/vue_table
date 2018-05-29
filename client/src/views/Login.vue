<template>
    <div class="login">
        <b-form @submit="login">
            <b-form-group id="username"
                            label="User name"
                            label-for="username">
                <b-form-input id="exampleInput1"
                            type="text"
                            v-model="username"
                            required
                            placeholder="Enter first name">
                </b-form-input>
            </b-form-group>
            <b-form-group id="password"
                            label="Password"
                            label-for="password">
                <b-form-input id="password"
                            type="text"
                            v-model="password"
                            required
                            placeholder="Password">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.$store.dispatch("login", { username: this.username, password: this.password });
    }
  }
};
</script>
