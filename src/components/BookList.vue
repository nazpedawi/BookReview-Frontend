<template>
  <div class="container-fluid">
    <div class="row">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
        :basePath="basePath"
      />
    </div>
  </div>
</template>

<script>
import BookCard from "./BookCard.vue";

export default {
  components: {
    BookCard,
  },
  data() {
    return {
      books: [
        {
          id: 1,
          title: "The Great Gatsby",
          cover_image: "gatsby.webp",
          description:
            "Set in the Jazz Age of the 1920s, The Great Gatsby follows the story of Jay Gatsby, a wealthy and mysterious man who throws lavish parties in hopes of reuniting with his lost love, Daisy Buchanan. Narrated by Nick Carraway, who moves next door to Gatsby, the novel explores themes of love, obsession, and the corruption of the American Dream. As Gatsby's pursuit of Daisy leads to tragic consequences, Fitzgerald reveals the emptiness of wealth and the fragility of human dreams.",
          author: "F. Scott Fitzgerald",
          genres: ["Fiction", "Classic"],
          publication_year: 1925,
        },
        {
          id: 2,
          title: "To Kill a Mockingbird",
          cover_image: "01374084_to-kill-a-mockingbird.jpg",
          description:
            "A novel by Harper Lee, set in the American South during the Great Depression.",
          author: "Harper Lee",
          genres: ["Fiction", "Classic", "Drama"],
          publication_year: 1960,
        },
      ],
      basePath: "/images/",
    };
  },
};
</script>
