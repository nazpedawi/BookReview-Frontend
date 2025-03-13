<template>
    <div class="modal fade" id="deleteModal" ref="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close btn-close-white" @click="close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this book?
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
            <button type="button" class="btn btn-danger" @click="confirm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    emits: ["confirm-delete", "close-modal"],
    mounted() {
        try {
      if (!window.bootstrap) {
        throw new Error("Bootstrap is not available on window.");
      }
      // Initialize the modal using the global bootstrap object
      this.modalInstance = new window.bootstrap.Modal(this.$refs.modal);
      this.modalInstance.show();
    } catch (error) {
      console.error("Error initializing DeleteModal:", error);
    }
    },
    methods: {
      close() {
        this.$emit("close-modal");
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      confirm() {
        this.$emit("confirm-delete");
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
    },
  };
  </script>

  