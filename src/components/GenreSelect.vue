<template>
  <div>
    <select
      v-model="selectedGenre"
      class="form-control form-control-md w-100"
      id="genre-select"
    >
      <option value="" disabled>Select Genre</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.name">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  props: {
    modelValue: String,  // To receive selectedGenre from parent
  },
  data() {
    return {
      genres: [],
      selectedGenre: this.modelValue,  // Initialize selectedGenre with parent prop
    };
  },
  watch: {
    modelValue(newValue) {
      this.selectedGenre = newValue;  // Sync modelValue with internal data
    },
    selectedGenre(newValue) {
      this.$emit('update:modelValue', newValue);  // Emit updated genre to parent
    },
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await axios.get(API_ENDPOINTS.genres);
        this.genres = response.data;
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    },
  },
  mounted() {
    this.fetchGenres();
  },
};
</script>
