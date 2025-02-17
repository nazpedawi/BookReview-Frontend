<template>
    <div class="app">
        <Navbar />
      <router-view /> <!-- This will load your pages -->
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
  </style>
  