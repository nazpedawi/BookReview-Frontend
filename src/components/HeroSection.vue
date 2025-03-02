<template>
  <div class="position-relative hero-section mb-4">
    <img
      :src="src"
      class="img-fluid w-100 background-image"
      alt="Homepage Hero Section Background"
    />
    <div
      class="position-absolute top-50 start-50 translate-middle text-center text-white text-overlay"
    >
      <h1 class="display-4">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    title: String,
  },
};
</script>

<style scoped>
.hero-section {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-image {
  height: 550px;
  object-fit: cover;
  opacity: 0.5;
}

.text-overlay h1 {
  font-weight: bold;
}
</style>
