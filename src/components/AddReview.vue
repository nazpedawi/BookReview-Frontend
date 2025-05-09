<template>
  <div class="add-review-form mt-5 text-white p-4">
    <h3>Write a Review</h3>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>

    <div v-if="authStore.isAuthenticated">
      <form @submit.prevent="submitReview">
        <div class="form-group">
          <h5 class="rating-label">Rating</h5>
          <div class="star-rating">
            <span
              v-for="value in [1, 2, 3, 4, 5]"
              :key="value"
              class="star"
              :class="{ filled: value <= (hoverRating || rating) }"
              @click="setRating(value)"
              @mouseover="hoverRating = value"
              @mouseleave="hoverRating = null"
            >
              &#9733;
            </span>
          </div>
          <div v-if="ratingError" class="rating-error">
            Please select a rating from 1 to 5.
          </div>
        </div>

        <div class="form-group">
          <textarea
            class="form-control"
            v-model="review_text"
            rows="4"
            placeholder="Write your review here..."
            required
          ></textarea>
        </div>

        <button type="submit" class="btn btn-outline-light btn-lg w-100 mt-3">
          Submit Review
        </button>
      </form>
    </div>

    <div v-if="!authStore.isAuthenticated">
      <p class="text-center mt-3">Login first to review this book!</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { API_ENDPOINTS } from "@/config";
import axios from "axios";

export default {
  props: {
    book: Object,
  },
  data() {
    return {
      book_id: this.book.book_id,
      rating: null,
      hoverRating: null,
      review_text: "",
      ratingError: false,
      error: null,
      success: null,
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
  },

  methods: {
    setRating(value) {
      this.rating = value;
      this.ratingError = false;
    },

    async submitReview() {
      if (!this.rating) {
        this.ratingError = true;
        return;
      }

      const reviewData = {
        book_id: this.book_id,
        user_id: this.authStore.user.user_id,
        review_text: this.review_text,
        rating: this.rating,
      };

      try {
        const response = await axios.post(API_ENDPOINTS.reviews, reviewData);
        this.success = "Review submitted successfully!";
        this.error = null;

        this.$emit("review-submitted", response.data);

        this.review_text = "";
        this.rating = null;
      } catch (err) {
        this.error = err.response?.data || "Failed to submit review.";
      }
    },
  },
};
</script>

<style scoped>
.star {
  cursor: pointer;
  font-size: 1.5rem;
  color: rgba(156, 120, 120, 0.49);
}
.star.filled {
  color: gold;
}
.rating-error {
  color: red;
  font-size: 1rem;
}
.rating-label {
  display: inline-block;
  margin-right: 10px;
  font-size: 1.5rem;
}

.star-rating {
  display: inline-block;
  margin-bottom: 1rem;
}

.star {
  margin-right: 5px;
  font-size: 1.5rem;
  color: rgba(156, 120, 120, 0.49);
  cursor: pointer;
}

.star.filled {
  color: gold;
}

.rating-error {
  display: inline-block;
  color: red;
  font-size: 1rem;
  margin-left: 10px;
  font-weight: bold;
}

textarea.form-control {
  margin-top: 1rem;
}
</style>
