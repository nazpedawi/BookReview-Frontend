<template>
  <select
    v-model="selectedGenre"
    class="form-control form-control-md"
    @change="$emit('update:selectedGenre', selectedGenre)"
  >
    <option value="" disabled>Select Genre</option>
    <option v-for="genre in genres" :key="genre" :value="genre">
      {{ genre }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
      selectedGenre: this.modelValue,
      genres: [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Fantasy",
        "Science Fiction",
        "Romance",
        "Horror",
        "Thriller",
      ],
    };
  },
  watch: {
    modelValue(newValue) {
      this.selectedGenre = newValue;
    },
  },
};
</script>
