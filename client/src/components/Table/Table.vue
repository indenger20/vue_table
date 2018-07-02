<template>
  <div class="main-table">
    <transition name="fade" mode="out-in">
      <table class="table">
        <thead>
          <tr>
            <th 
              v-for="(field, index) in fields"
              v-bind:key="index"
              :rowspan="field.colspan"
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
            v-for="(order, index) in orders"
            v-bind:key="order.order_id"
            v-drag-and-drop 
            v-on:drop="(e) => handleDrop(e, index)"
            v-on:drag="(e) => handleDrag(e, index)"
          >
            <td>{{order.order_id}}</td>
            <td>
              {{order.title}}
            </td>
            <td>
              {{order.price}}
            </td>
            <td>
              <b-dropdown text="Dropdown Button" size="sm">
                <b-dropdown-item @click="() => handleAction(order, 'edit')">Edit</b-dropdown-item>
                <b-dropdown-item @click="() => removeRow(order)">Remove</b-dropdown-item>
                <b-dropdown-item @click="() => handleAction(order, 'preview')">Preview</b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
        </transition-group>
        
      </table>
    </transition>
    <modal 
      :modalShow="modalShow"
      :closeModal="closeModal"
      :order="order"
      :modalType="modalType"
    ></modal>
    
  </div>
</template>

<script>
import Table from "./Table.js";

export default Table;
</script>

<style src="./Table.css" scoped></style>
