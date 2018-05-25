<template>
  <b-form @submit="save">
    <h3>Enter some Text</h3>
    <b-form-group id="exampleInputGroup1"
                      label="First name"
                      label-for="exampleInput1"
                      description="We'll never share your email with anyone else.">
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="first_name"
                      required
                      placeholder="Enter first name">
        </b-form-input>
    </b-form-group>
    <b-form-group id="exampleInputGroup2"
                      label="Last name"
                      label-for="exampleInput2"
                      description="We'll never share your email with anyone else.">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="last_name"
                      required
                      placeholder="Enter last name">
        </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
export default {
  name: "EditionModal",
  props: {
    record: Object,
    closeModal: Function,
    localModalType: String
  },
  data() {
    return {
      first_name: "",
      last_name: ""
    };
  },
  methods: {
    getData() {
      return {
        record: this.record,
        first_name: this.first_name,
        last_name: this.last_name
      };
    },
    clearInputs() {
      this.first_name = "";
      this.last_name = "";
    },
    save(e) {
      e.preventDefault();
      const data = this.getData();
      if (this.localModalType === "edit") {
        this.$store.dispatch("editRecord", data);
      } else if (this.localModalType === "add") {
        this.$store.dispatch("addRecord", data);
      }
      this.closeModal();
      this.clearInputs();
    }
  }
};
</script>
