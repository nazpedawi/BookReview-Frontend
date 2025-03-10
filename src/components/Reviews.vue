<template>
  <div class="reviews-section mt-5 text-white">
    <h3>Reviews</h3>

    <div v-if="reviews.length > 0">
      <ul class="list-group">
        <!-- Loop through reviews -->
        <li
          v-for="(review, index) in reviews"
          :key="index"
          class="list-group-item review-card"
        >
          <div
            class="d-flex justify-content-between align-items-center review-header"
          >
            <!-- User info -->
            <div class="d-flex align-items-center">
              <strong>{{ review.firstName }} {{ review.lastName }}</strong>
            </div>
            <!-- Review date -->
            <small class="review-date">{{
              formatDate(review.review_date)
            }}</small>
          </div>

          <!-- Rating stars -->
          <div class="stars">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ filled: star <= review.rating }"
            >
              &#9733;
            </span>
          </div>

          <!-- Review text -->
          <p class="card-text">{{ review.review_text }}</p>
        </li>
      </ul>
    </div>

    <!-- Message if no reviews -->
    <div v-else>
      <p class="text-center mt-3">
        No reviews yet. Be the first to review this book!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleString("en-GB", options);
    },
  },
};
</script>

<style scoped>
.reviews-section {
  margin-top: 2rem;
  color: white;
}

.review-card {
  background-color: #2c2f38;
  margin-bottom: 1rem;
}

.review-header {
  margin-bottom: 1rem;
}

.review-date {
  font-size: 0.9rem;
  color: #a1a1a1;
}

.stars {
  margin-bottom: 1rem;
}

.star {
  color: rgba(156, 120, 120, 0.49);
  font-size: 1.2rem;
}

.star.filled {
  color: gold;
}

.card-text {
  white-space: pre-line;
}

.review-date {
  color: rgba(242, 241, 241, 0.873);
  font-size: 0.9rem;
}

.review-card {
  background-color: rgb(80, 60, 60);
  color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
}

.review-header {
  margin-bottom: 10px;
}

.star-rating {
  display: inline-block;
}
</style>
