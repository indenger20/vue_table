<template>
  <div class="main-table">
    <transition name="fade" mode="out-in">
      <table class="table">
        <thead>
          <tr>
            <th 
              v-for="(field, index) in fields"
              v-bind:key="index"
            >
              {{field.title}}
              <b-dropdown text="Sort" size="sm" v-if="field.sort">
                <b-dropdown-item @click="() => handleSort(field.title, 'Alphabetic')">Alphabetic</b-dropdown-item>
              </b-dropdown>
            </th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="table-row" mode="out-in">
          <tr
            v-for="(item, index) in records"
            v-bind:key="item.id"
            v-drag-and-drop 
            v-on:drop="(e) => handleDrop(e, index)"
            v-on:drag="(e) => handleDrag(e, index)"
          >
            <td>
              {{item.first_name}}
            </td>
            <td>
              {{item.last_name}}
            </td>
            <td>
              <b-dropdown text="Dropdown Button" size="sm">
                <b-dropdown-item @click="() => handleAction(item, 'edit')">Edit</b-dropdown-item>
                <b-dropdown-item @click="() => removeRow(item)">Remove</b-dropdown-item>
                <b-dropdown-item @click="() => handleAction(item, 'preview')">Preview</b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
          <tr v-bind:key="'addButton'">
            <td>
              <b-button variant="primary" @click="() => handleAction(null, 'add')">Add Row</b-button>
            </td>
            <td></td>
            <td></td>
          </tr>
        </transition-group>
        
      </table>
    </transition>
    <modal 
      :modalShow="modalShow"
      :closeModal="closeModal"
      :record="record"
      :modalType="modalType"
    ></modal>
    
  </div>
</template>

<script>
import Table from "./Table.js";

export default Table;
</script>

<style src="./Table.css" scoped></style>
