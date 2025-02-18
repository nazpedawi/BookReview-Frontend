<template>
  <input
    v-model="searchQuery"
    type="text"
    class="form-control form-control-md w-100 border-0"
    placeholder="Search for books..."
    aria-label="Search"
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
};
</script>
