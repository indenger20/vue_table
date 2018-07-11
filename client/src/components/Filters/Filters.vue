<template>
  <div class="filters">
    <div class="filters__row">
      <span class="filters__title">Make</span>
      <div class="filters__box">
        <b-form-checkbox-group 
          :options="makes"
          v-model="selected"
        >
        </b-form-checkbox-group>
      </div>
      <div class="filters__buttons">
        <button class="btn filters__clear" @click="clearCheckBox">Clear</button>
      </div>
    </div>
    <div class="filters__row">
      <span class="filters__title">Price</span>
      <div class="filters__box filters__box--visible">
        <vue-slider 
          ref="slider" 
          v-model="slider.value" 
          v-bind="slider"
        >
        </vue-slider>
      </div>
      <div class="filters__buttons">
        <button class="btn filters__clear" @click="resetSlider">Clear</button>
        <button class="btn filters__apply" @click="applyFilters">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import Fitlers from "./Fitlers";

export default Fitlers;
</script>

<style src="./Filters.scss"  lang="scss"></style>