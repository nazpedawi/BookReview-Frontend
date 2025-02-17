<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-2">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/src/assets/images/website-logo.PNG" alt="logo" width="150" height="100" />
        </a>
  
        <!-- Navbar Items for Desktop -->
        <div class="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo03">
          <div class="navbar-nav">
            <a class="nav-link active" href="/">Home</a>
            <a class="nav-link" href="/book/add">Add New Book</a>
          </div>
  
          <!-- User info or Login / Register buttons -->
          <div class="d-flex align-items-center">
            <span class="navbar-text text-light me-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
              John Doe
            </span>
            <button class="btn btn-outline-danger btn-lg">Logout</button>
          </div>
        </div>
  
        <!-- Navbar Toggler (for smaller screens) -->
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  
    <!-- Sidebar (for smaller screens) -->
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column align-items-center">
        <div class="d-flex flex-column align-items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-person-fill mb-2" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
          <span class="text-light fs-5">
            John Doe
          </span>
        </div>
  
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <a class="nav-link active" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/book/add">Add New Book</a>
          </li>
        </ul>
  
        <div class="mt-auto w-100">
          <button class="btn btn-outline-danger btn-lg w-100">Logout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No need for any logic here since you want a static navbar
  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>
  