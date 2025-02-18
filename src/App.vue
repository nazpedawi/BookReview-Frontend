<template>
  <div class="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body {
  background-color: rgb(54, 39, 39);
}
</style>
