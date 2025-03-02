<template>
  <HeroSection
    src="/images/background-books.png"
    title="Find Your Next Great Read"
  />
  <div class="text-center mt-4 mb-2">
    <SearchForm />
  </div>
  <div class="mt-4 mb-4">
    <BookList />
  </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import SearchForm from "@/components/SearchForm.vue";
import BookList from "@/components/BookList.vue";

export default {
  components: {
    HeroSection,
    SearchForm,
    BookList,
  },
};
</script>
