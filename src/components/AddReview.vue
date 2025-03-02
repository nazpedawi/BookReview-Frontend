<template>
    <div class="add-review-form mt-5 text-white p-4">
      <h3>Write a Review</h3>
      <!-- Check if user is logged in -->
      <form @submit.prevent="submitReview" id="reviewForm">
        <!-- Hidden book_id (passed from parent or API) -->
        <input type="hidden" v-model="book_id" />
  
        <!-- Rating Section -->
        <div class="form-group">
          <h5 for="rating" class="rating-label">Rating</h5>
          <div class="star-rating">
            <span
              v-for="value in [1, 2, 3, 4, 5]"
              :key="value"
              class="star"
              :data-value="value"
              :class="{ filled: value <= rating }"
              @mouseover="highlightStars(value)"
              @mouseout="highlightStars(rating)"
              @click="setRating(value)"
            >
              &#9733;
            </span>
          </div>
          <div v-if="ratingError" class="rating-error">Please select a rating from 1 to 5.</div>
        </div>
  
        <!-- Review Text Section -->
        <div class="form-group">
          <textarea
            class="form-control"
            v-model="review_text"
            rows="4"
            placeholder="Write your thoughts here..."
            required
          ></textarea>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="btn btn-outline-light btn-lg w-100 mt-3">Submit Review</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      book: Object, // Book ID passed from the parent
    },
    data() {
      return {
        book_id: this.bookId,
        rating: null,
        review_text: "",
        ratingError: false,
      };
    },
    methods: {
      highlightStars(value) {
        this.ratingError = false;
        this.$nextTick(() => {
          const stars = document.querySelectorAll(".star-rating .star");
          stars.forEach((star) => {
            if (parseInt(star.getAttribute("data-value")) <= value) {
              star.classList.add("filled");
            } else {
              star.classList.remove("filled");
            }
          });
        });
      },
      setRating(value) {
        this.rating = value;
      },
      submitReview() {
        if (this.validateRating()) {
          console.log("Submitting review:", {
            book_id: this.book_id,
            rating: this.rating,
            review_text: this.review_text,
          });
  
          this.rating = null;
          this.review_text = "";
        }
      },
      validateRating() {
        if (!this.rating) {
          this.ratingError = true;
          return false;
        }
        return true;
      },
    },
  };
  </script>
  
  <style scoped>
  .rating-label {
    display: inline-block;
    margin-right: 10px;
    font-size: 1.5rem;
  }
  
  .star-rating {
    display: inline-block;
    margin-bottom: 1rem; /* Add space between the stars and textarea */
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
    margin-top: 1rem; /* Add space between rating and textarea */
  }
  </style>
  