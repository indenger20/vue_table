

import vueSlider from 'vue-slider-component';
import { formatUSD, createFitlerQuery } from '../../helpers/utils';
import { mapState } from 'vuex';

const slider = {
  value: [0, 500000],
  width: '100%',
  height: 8,
  dotSize: 16,
  min: 0,
  max: 500000,
  disabled: false,
  show: true,
  useKeyboard: true,
  tooltip: 'always',
  formatter: function (value) {
    return formatUSD(+value)
  },
  overlapFormatter: 'from{value1} ~ to{value2}',
  bgStyle: {
    backgroundColor: '#fff',
    boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
  },
  tooltipStyle: {
    backgroundColor: '#666',
    borderColor: '#666'
  },
  processStyle: {
    backgroundColor: '#999'
  }
}

export default {
  name: 'Filters',
  components: {
    vueSlider
  },
  data() {
    return {
      selected: [],
    }
  },
  methods: {
    clearCheckBox(e) {
      this.selected = [];
    },
    resetSlider() {
      this.$store.commit("document/resetSlider");
    },
    applyFilters() {
      const makes = this.$store.state.document.makes;
      const selected = this.selected;
      const price = this.slider.value;

      const data = createFitlerQuery({ makes, selected, price });
      this.$store.dispatch('document/updateFilter', data);
    },
  },
  computed: {
    makes() {
      return this.$store.state.document.makes.map(m => m.title);
    },
    ...mapState({
      slider: state => {
        return { ...slider, value: state.document.filter.price }
      }
    })
  },
  watch: {
    selected() {
      this.applyFilters();
    }
  }
}