<template>
  <div>
    <button @click="goToInputItems" class="back-button">Go to Input Items</button>
    <h1>Inventory</h1>

  
    <DataTable :apiUrl="'http://localhost:3000/api/materials'" />
    <ProjectList :apiUrl="'http://localhost:3000/api/practice'" />

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
.back-button {
  position: absolute;
  top: 400px;
  left: 50px;
  padding: 10px 20px;
    font-size: 16px;
    font-weight: 100;
    background-color: #8ad190;
    color: rgb(15, 0, 0);
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>