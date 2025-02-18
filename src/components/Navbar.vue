<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-1">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img
          src="/src/assets/images/website-logo.PNG"
          alt="book review logo"
          width="130"
          height="80"
        />
      </router-link>

      <!-- Navbar Items for Desktop -->
      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarTogglerDemo03"
      >
        <div class="navbar-nav">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
          <router-link to="/add-book" class="nav-link" active-class="active"
            >Add New Book</router-link
          >
        </div>

        <div class="d-flex align-items-center">
          <span class="navbar-text text-light me-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
              />
            </svg>
            John Doe
          </span>
          <button class="btn btn-outline-danger btn-lg">Logout</button>
        </div>
      </div>

      <!-- Navbar Toggler (for smaller screens) -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
        aria-controls="sidebar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <!-- Sidebar (for smaller screens) -->
  <div
    class="offcanvas offcanvas-end text-bg-dark"
    tabindex="-1"
    id="sidebar"
    aria-labelledby="sidebarLabel"
  >
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body d-flex flex-column align-items-center">
      <div class="d-flex flex-column align-items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          fill="currentColor"
          class="bi bi-person-fill mb-2"
          viewBox="0 0 16 16"
        >
          <path
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
          />
        </svg>
        <span class="text-light fs-5"> John Doe </span>
      </div>

      <ul class="navbar-nav w-100">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/add-book" class="nav-link" active-class="active"
            >Add New Book</router-link
          >
        </li>
      </ul>

      <div class="mt-auto w-100">
        <button class="btn btn-outline-danger btn-lg w-100">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.navbar-nav .nav-link {
  font-weight: bold;
  font-size: large;
  color: #68737d;
}

.navbar-nav .nav-link:hover {
  color: white;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
}

.nav-link.active {
  color: #ffffff !important;
}
</style>
