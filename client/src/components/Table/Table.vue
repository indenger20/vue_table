<template>
  <div>
    <b-table hover :items="records" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-dropdown text="Dropdown Button" size="sm">
          <b-dropdown-item @click="() => handleAction(row.item, 'edit')">Edit</b-dropdown-item>
          <b-dropdown-item @click="() => removeRow(row.item)">Remove</b-dropdown-item>
          <b-dropdown-item @click="() => handleAction(row.item, 'preview')">Preview</b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
    <modal 
      :modalShow="modalShow"
      :closeModal="closeModal"
      :record="record"
      :modalType="modalType"
    ></modal>
    <b-button variant="primary" @click="() => handleAction(null, 'add')">Add Row</b-button>
  </div>
</template>

<script>
import Table from "./Table.js";

export default Table;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Table.css" scoped></style>
