<template>
  <form
    class="d-flex flex-column flex-md-row justify-content-center align-items-center w-75 mx-auto mt-3"
  >
    <div class="col-lg-4 col-md-6 col-sm-8 mb-2 mb-md-0 me-md-3">
      <SearchInput v-model="searchQuery" />
    </div>

    <div class="col-lg-3 col-md-4 col-sm-8">
      <GenreSelect v-model="selectedGenre" />
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
  data() {
    return {
      searchQuery: "",
      selectedGenre: "",
    };
  },
};
</script>
