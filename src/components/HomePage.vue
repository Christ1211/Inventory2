<template>
  <div class="inventory-app">
    <button @click="goToInputItems" class="back-button">Go to Input Items</button>
    <h1 class="main-heading">Inventory</h1>

    <div class="data-section">
      <h2 class="section-heading">Available Parts</h2>
      <DataTable :apiUrl="'http://localhost:3000/api/materials'" />
    </div>

    <div class="data-section">
      <h2 class="section-heading2">Project List</h2>
      <ProjectList :apiUrl="'http://localhost:3000/api/practice'" />
    </div>
  </div>
</template>

<script>
import DataTable from './DataTable.vue';
import ProjectList from './ProjectList.vue';

export default {
  components: {
    DataTable,
    ProjectList,
  },
  methods: {
    goToInputItems() {
      this.$router.push('/input-items'); // Redirect to InputItems.vue
    },
  },
};
</script>

<style scoped>
.inventory-app {
  padding: 20px;
}

.back-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #8ad190;
  color: rgb(15, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.main-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.data-section {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
}

.section-heading {
  font-size: 30px;
  margin-bottom: 10px;
  background-color: #8ad190;
}

.section-heading2{
  font-size: 30px;
  margin-bottom: 10px;
  background-color: #8ad190;
}
</style>
