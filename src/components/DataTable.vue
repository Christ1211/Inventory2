<template>
  <div class="Mats-table">
    <h2></h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="material in materials" :key="material.id">
          <td>{{ material.id }}</td>
          <td>{{ material.ItemName }}</td>
          <td>{{ formatPrice(material.Price) }}</td>
          <td>{{ material.Amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      materials: []
    };
  },
  mounted() {
    this.fetchMaterials();
  },
  methods: {
    async fetchMaterials() {
      try {
        const response = await axios.get('http://localhost:3000/api/materials');
        this.materials = response.data;
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    },
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
.Mats-table {
  margin: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid black;
  text-align: left;
}
th {
  background-color: whitesmoke;
}
</style>
