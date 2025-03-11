<template>
  <div class="container-fluid mt-4 mb-4">
    <BookDetails v-if="book" :book="book" :basePath="basePath" />
    <AddReview v-if="book" :book="book" @review-submitted="addNewReview" />
    <Reviews v-if="book" :reviews="reviews" />
  </div>
</template>

<script>
import BookDetails from "@/components/BookDetails.vue";
import AddReview from "@/components/AddReview.vue";
import Reviews from "@/components/Reviews.vue";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  components: {
    BookDetails,
    AddReview,
    Reviews,
  },
  data() {
    return {
      book: null,
      reviews: [],
      bookId: this.$route.params.id,
      basePath: "/images/",
      isLoading: true,
      error: null,
    };
  },
  async mounted() {
    await this.loadBookDetails();
  },
  methods: {
    async loadBookDetails() {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`${API_ENDPOINTS.books}/${this.bookId}`);
        const { book, reviews } = response.data;

        this.book = book;
        this.reviews = reviews;
      } catch (error) {
        console.error("Error fetching book details:", error);
        this.error = error.message || "Failed to load book.";
      } finally {
        this.isLoading = false;
      }
    },
    addNewReview(newReview) {
      // Update the reviews list dynamically
      this.reviews.unshift(newReview);
    },
  },
};
</script>
