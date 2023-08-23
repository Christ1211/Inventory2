<template>
  <div class="Materials-table">
    <h2>Materials Table</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Item Name</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(material, index) in materials" :key="material.id">
          <td>{{ material.id }}</td>
          <td>
            <input v-model="material.ItemName" :disabled="!material.editing" />
          </td>
          <td>
            <input v-model="material.Price" :disabled="!material.editing" />
          </td>
          <td>
            <input v-model="material.Amount" :disabled="!material.editing" />
          </td>
          <td>
            <button @click="editMaterial(index)" v-if="!material.editing">Edit</button>
            <button @click="saveMaterial(index)" v-else>Save</button>
          </td>
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
        this.materials = response.data.map(material => ({ ...material, editing: false }));
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    },
    editMaterial(index) {
      this.materials[index].editing = true;
    },
    async saveMaterial(index) {
      try {
        const material = this.materials[index];
        const response = await axios.put(`http://localhost:3000/api/materials/${material.id}`, material);
        if (response.status === 200) {
          this.materials[index].editing = false;
        }
      } catch (error) {
        console.error('Error saving material:', error);
      }
    }
  }
};
</script>

<style scoped>
.Materials-table {
  margin: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid black;
  text-align: center;
}
th {
  background-color: whitesmoke;
}
</style>
