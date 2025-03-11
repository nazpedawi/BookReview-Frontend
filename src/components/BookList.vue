<template>
  <div class="container-fluid">
    <div class="row">
      <BookCard
        v-for="book in books"
        :key="book.book_id"
        :book="book"
      />
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
  data() {
    return {
      books: [],
      isLoading: true,
      error: null,
    };
  },
  async mounted() {
    await this.loadBooks();
  },
  methods: {
    async loadBooks() {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(API_ENDPOINTS.books);
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
