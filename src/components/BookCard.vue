<template>
  <div class="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
    <router-link
      :to="{ name: 'BookDetails', params: { id: book.id } }"
      class="card-link text-decoration-none w-100"
      :title="`View details for ${book.title}`"
    >

      <div class="card custom-card border-primary">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-center book-title">{{ book.title }}</h5>

          <div class="image-container d-block mx-auto">
            <div class="image-wrapper">
              <img
                :src="basePath + book.cover_image"
                :alt="book.title"
                class="card-img-top img-fluid book-cover"
              />
            </div>
          </div>

          <p
            class="card-text"
            v-html="book.description.replace(/\n/g, '<br>')"
          ></p>

          <div class="mt-auto">
            <p class="card-text"><strong>Author:</strong> {{ book.author }}</p>
            <p class="card-text">
              <strong>Genre(s):</strong> {{ book.genres.join(", ") }}
            </p>
            <p class="card-text">
              <strong>Publication Year:</strong> {{ book.publication_year }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    basePath: String, // The base path for book cover images
  },
};
</script>

<style scoped>
.image-wrapper {
  width: 100%;
  height: 450px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}

.book-cover {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.custom-card:hover {
  background-color: rgba(215, 176, 176, 0.393);
  transition: all 0.3s ease;
}

.custom-card {
  background-color: rgb(80, 60, 60);
  color: white;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-body {
  flex-grow: 1;
}

.cover-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>
