<template>
  <form class="d-flex flex-column flex-md-row justify-content-center align-items-center w-75 mx-auto mt-3">
    <div class="col-lg-4 col-md-6 col-sm-8 mb-2 mb-md-0 me-md-3">
      <SearchInput :modelValue="searchQuery" @update:modelValue="updateSearchQuery" />
    </div>

    <div class="col-lg-3 col-md-4 col-sm-8">
      <GenreSelect :modelValue="selectedGenre" @update:modelValue="updateSelectedGenre" />
    </div>
  </form>
</template>


<script>
import SearchInput from "@/components/SearchInput.vue";
import GenreSelect from "@/components/GenreSelect.vue";

export default {
  components: {
    SearchInput,
    GenreSelect,
  },
  props: {
    searchQuery: String, 
    selectedGenre: String, 
  },
  methods: {
    // Methods to update the parent when the values change
    updateSearchQuery(newValue) {
      this.$emit('update:searchQuery', newValue); 
    },
    updateSelectedGenre(newValue) {
      this.$emit('update:selectedGenre', newValue);
    },
  },
};
</script>
