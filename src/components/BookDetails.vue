<template>
    <div class="container my-5">
      <div class="card mb-3 book-details-card custom-card">
        <div class="row no-gutters">
          <!-- Image Section -->
          <div class="col-md-4">
            <img
              :src="basePath + book.cover_image"
              :alt="book.title"
              class="img-fluid cover-image"
            />
          </div>
  
          <!-- Book Details Section -->
          <div class="col-md-8">
            <div class="card-body d-flex flex-column">
              <div>
                <h3 class="card-title">{{ book.title }}</h3>
                <p class="card-text">{{ book.description }}</p>
                <p class="card-text"><strong>Author:</strong> {{ book.author }}</p>
                <p class="card-text"><strong>Genre(s):</strong> {{ book.genres.join(', ') }}</p>
                <p class="card-text"><strong>Publication Year:</strong> {{ book.publication_year }}</p>
              </div>
  
              <!-- Actions Section (For Admin Only) -->
              <div class="mt-auto">
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between">
                  <!-- Assuming there’s logic to show "Edit" and "Delete" buttons for admin -->
                  <a href="/editbook/{{ book.id }}" class="btn btn-outline-light btn-lg mb-2 mb-md-0 w-100 w-md-50 me-md-2">
                    Edit
                  </a>
                  <button type="button" class="btn btn-outline-danger btn-lg w-100">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  /* Custom Card Styling */
  .book-details-card {
    background-color: rgb(80, 60, 60);
    color: white;
  }
  
  /* Book Cover Image Styles */
  .cover-image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  
  /* Card Layout Styling */
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  
  .card-body {
    flex-grow: 1;
  }
  
  /* Button Styles */
  .btn-outline-light {
    background-color: rgba(0, 123, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.895);
    color: rgba(255, 255, 255, 0.7);
  }
  
  .btn-outline-light:hover {
    background-color: rgba(0, 123, 255, 0.4);
    border-color: rgba(0, 123, 255, 0.397);
    color: white;
  }
  
  .btn-outline-danger {
    background-color: rgba(220, 53, 69, 0.2);
    border-color: rgba(220, 53, 69, 0.8);
    color: rgba(220, 53, 69, 0.7);
  }
  
  .btn-outline-danger:hover {
    background-color: rgba(220, 53, 69, 0.4);
    border-color: rgba(220, 53, 69, 0.7);
    color: white;
  }
  
  /* Media Queries for Responsiveness */
  @media (max-width: 768px) {
    .cover-image {
      height: auto;
    }
  }
  </style>
  