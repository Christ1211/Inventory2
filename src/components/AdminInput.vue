<template>
    <div>
      <button @click="goToAdminPage" class="back-button">Go Back</button>
      <h1>Inventory</h1>
  
      <div class="content-container">
        <div class="left-content">
          <AddItems :apiUrl="'http://localhost:3000/api/materials'" />
        </div>
        <div class="right-content">
          <CreateProject :apiUrl="'http://localhost:3000/api/materials'" />
        </div>
      </div>
    </div>
  </template>
  <script>
  import AddItems from './AddItems.vue';
  import CreateProject from '@/components/CreateProject.vue';
  
  export default {
    components: {
      AddItems,
      CreateProject,
    },
    methods: {
      goToAdminPage() {
        this.$router.push('/AdminPage'); // Redirect to InputItems.vue
      },
    },
  };
  </script>
  
  <style scoped>
  .back-button {
    position: absolute;
    top: 350px;
    left: 750px;
    padding: 10px 20px;
      font-size: 16px;
      font-weight: 100;
      background-color: #8ad190;
      color: rgb(15, 0, 0);
      border: none;
      border-radius: 5px;
      cursor: pointer;
  
  }
  
  .content-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .left-content {
    flex: .2;
    width: 100;
    margin-right: 10px;
  }
  
  .right-content {
    flex: .2;
    margin-left: 10px;
  }
  </style>
  