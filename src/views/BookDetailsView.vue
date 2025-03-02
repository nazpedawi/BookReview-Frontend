<template>
    <div class="mt-4 mb-4">
      <BookDetails v-if="book" :book="book"  :basePath="basePath" />
      <AddReview v-if="book" :book="book"/>
      <!-- Message if user is not logged in -->
    </div>
  </template>
  
  <script>
  import BookDetails from "@/components/BookDetails.vue";
  import AddReview from "@/components/AddReview.vue";
  
  export default {
    components: {
      BookDetails,
      AddReview,
    },
    props: {
      book: {
        type: Object,
        required: true,
      },
       basePath: {  // Make sure basePath is accepted as a prop here
      type: String,
      required: true,
    },
    },
  };
  </script>
  