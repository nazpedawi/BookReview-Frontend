<template>
  <input
    v-model="searchQuery"
    type="text"
    class="form-control form-control-md w-100"
    placeholder="Search for books..."
    aria-label="Search"
    @input="updateSearchQuery"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
      searchQuery: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.searchQuery = newValue;
    },
  },
  methods: {
    updateSearchQuery() {
      this.$emit('update:modelValue', this.searchQuery);
    },
  },
};
</script>
