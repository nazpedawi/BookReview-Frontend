<template>
  <div class="container-fluid">
    <div class="row">
      <BookCard
        v-for="book in books"
        :key="book.book_id"
        :book="book"
      />
      
      <div v-if="!isLoading && books.length === 0" class="col-12 text-center text-white">
        <h3>No books found with title "{{ searchQuery }}" in the "{{ selectedGenre }}" genre.</h3>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from "./BookCard.vue";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  components: {
    BookCard,
  },
  props: {
    searchQuery: String,
    selectedGenre: String,
  },
  data() {
    return {
      books: [],
      isLoading: true,
      error: null,
    };
  },
  watch: {
    searchQuery: "loadBooks",
    selectedGenre: "loadBooks",
  },
  async mounted() {
    await this.loadBooks();
  },
  methods: {
    async loadBooks() {
      try {
        const response = await axios.get(API_ENDPOINTS.books, {
          params: {
            search: this.searchQuery,
            genre: this.selectedGenre,
          },
        });
        this.books = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to load books.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
