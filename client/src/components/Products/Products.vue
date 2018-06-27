<template>
  <ul class="products-list">
    <li
      v-for="(item, index) in products"
      v-bind:key="index"
    >
      {{item.title}}
      <button @click="() => addOrder(item)">Add to cart</button>
    </li>
  </ul>
</template>

<script>
import Products from "./Products.js";

export default Products;
</script>

<style src="./Products.css" scoped></style>
