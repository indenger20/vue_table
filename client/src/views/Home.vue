<template>
  <div class="home">
    <h1>Landing Page</h1>
    <div class="car-slider">
      <h3 class="car-slider__title">Browse by Style</h3>
      <ul class="car-slider__list">
        <li
          class="car-slider__item"
          v-for="(category, index) in categories"
          v-bind:key="index"
        >
          <div class="car-slider__box">
            <div class="car-slider-images">
              <carousel :per-page="1" class="car-slider-images__list">
                <slide v-for="(img, i) in category.images" v-bind:key="i" class="car-slider-images__item">
                  <img  :src="require(`@/../../images/${img}`)" alt="">
                </slide>
              </carousel>
            </div>
            <span class="car-slider__title">{{category.title}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  components: {},

  methods: {},
  computed: {
    categories() {
      return this.$store.state.document.categories;
    }
  },
  created() {}
};
</script>


<style lang="scss">
  .car-slider {

    &__list {
      padding: 0;
      margin: 0 -15px;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      padding: 0 15px 30px;
      width: 25%;
    }

    &__box {
      padding: 15px;
      border: 1px solid #eee; 
      height: 100%;
    }

    &__title {
      display: block;
    }

    .VueCarousel-dot {
      margin: 0!important;
      padding: 5px 5px 0 5px!important;
    }

  }
  .car-slider-images {

    &__list {
      
    }

    &__item {

    }

    img {
      display: block;
      width: 100%;
    }

  }
</style>