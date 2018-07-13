<template>
  <ul class="products">
    <li
      class="products__item"
      v-for="(product, index) in products"
      v-bind:key="index"
    >
      <div class="products__box">
        <div class="products__image">
          <img class="products__img" :src="require(`@/../../images/${product.img}`)"  alt="">
        </div>
        <span class="products__title link" @click="() => getProductInfo(product.id)">{{product.title}}</span>
        <div class="products__more">
          <span class="products__price">{{formatPrice(product.price)}}</span>
        </div>
        <button v-if="isAuth && !product.inCart" class="products__add btn" @click="() => addOrder(product)">Add to cart</button>
        <span v-if="product.inCart" class="products__add btn">In cart</span>
      </div>
    </li>
  </ul>
</template>

<script>
import Products from "./Products.js";

export default Products;
</script>

<style src="./Products.scss"  lang="scss"></style>
