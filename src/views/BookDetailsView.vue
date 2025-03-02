<template>
    <div class="container-fluid mt-4 mb-4">
      <BookDetails v-if="book" :book="book" :basePath="basePath" />
      <AddReview v-if="book" :book="book"/>
      <Reviews v-if="book" :reviews="reviews" />
    </div>
  </template>
  
  <script>
  import BookDetails from "@/components/BookDetails.vue";
  import AddReview from "@/components/AddReview.vue";
  import Reviews from "@/components/Reviews.vue";
  
  export default {
    components: {
      BookDetails,
      AddReview,
      Reviews,
    },
    props: {
      book: {
        type: Object,
        required: true,
      },
      basePath: {
        type: String,
        required: true,
      },
      reviews: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  