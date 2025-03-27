<template>
  <div class="container-fluid mt-4 mb-4">
    <div v-if="isLoading" class="spinner-container text-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="alertMessage" class="alert alert-success fade show" role="alert">
      {{ alertMessage }}
    </div>

    <BookDetails
      v-if="book"
      :book="book"
      @request-delete="openDeleteModal"
      :deleteBook="deleteBook"
    />
    <AddReview v-if="book" :book="book" @review-submitted="addNewReview" />
    <Reviews v-if="book" :reviews="reviews" />

    <DeleteModal
      v-if="isDeleteModalOpen"
      @confirm-delete="deleteBook"
      @close-modal="isDeleteModalOpen = false"
    />
  </div>
</template>

<script>
import BookDetails from "@/components/BookDetails.vue";
import AddReview from "@/components/AddReview.vue";
import Reviews from "@/components/Reviews.vue";
import DeleteModal from "@/components/DeleteBook.vue";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  components: {
    BookDetails,
    AddReview,
    Reviews,
    DeleteModal,
  },
  data() {
    return {
      book: null,
      reviews: [],
      bookId: this.$route.params.id,
      isLoading: true,
      error: null,
      isDeleteModalOpen: false,
      alertMessage: null,
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

        const response = await axios.get(
          `${API_ENDPOINTS.books}/${this.bookId}`
        );
        const { book, reviews } = response.data;

        this.book = book;
        this.reviews = reviews;
      } catch (error) {
        this.error = error?.response?.data?.error || "Failed to load book.";
      } finally {
        this.isLoading = false;
      }
    },
    openDeleteModal() {
      this.isDeleteModalOpen = true;
    },
    async deleteBook() {
      try {
        await axios.delete(`${API_ENDPOINTS.books}/${this.bookId}`, {
          headers: { "Content-Type": "application/json" },
        });

        this.alertMessage = "Book deleted successfully";

        // Wait a few seconds then redirect to home
        setTimeout(() => {
          this.$router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Error deleting book:", error);
      } finally {
        this.isDeleteModalOpen = false;
      }
    },
    addNewReview(newReview) {
      // Update the reviews list
      this.reviews.unshift(newReview);
    },
  },
};
</script>
