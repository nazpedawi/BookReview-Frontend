<template>
  <div>
    <select
      v-model="selectedGenre"
      class="form-control form-control-md w-100"
      id="genre-select"
    >
    <option value="">All Genres</option> 
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
    modelValue: String, 
  },
  data() {
    return {
      genres: [],
      selectedGenre: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.selectedGenre = newValue; 
    },
    selectedGenre(newValue) {
      this.$emit('update:modelValue', newValue);
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
