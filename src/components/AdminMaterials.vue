<template>
    <div class="materials-table">
      <h2>Materials Table</h2>
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
            <td>
              <input v-model="material.ItemName" :disabled="material.isEditing" />
            </td>
            <td>
              <input v-model="material.Price" :disabled="material.isEditing" />
            </td>
            <td>
              <input v-model="material.Amount" :disabled="material.isEditing" />
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="saveChanges">Save Changes</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        materials: [],
      };
    },
    mounted() {
      this.fetchMaterials();
    },
    methods: {
      async fetchMaterials() {
        try {
          const response = await axios.get('http://localhost:3000/api/materials');
          this.materials = response.data.map(material => ({ ...material, isEditing: false }));
        } catch (error) {
          console.error('Error fetching materials:', error);
        }
      },
      async updateMaterial(material) {
  if (material.isEditing) {
    try {
      console.log('Updating material:', material);
      const response = await axios.put(`http://localhost:3000/api/materials/${material.id}`, material);
      if (response.data.success) {
        console.log('Update response:', response.data);
      } else {
        console.error('Update failed:', response.data.message);
      }
      // Handle success or show notification
    } catch (error) {
      console.error('Error updating material:', error);
    }
  }
},
      async saveChanges() {
        console.log('Saving changes...');
        for (const material of this.materials) {
          if (material.isEditing) {
            console.log('Saving material:', material);
            await this.updateMaterial(material);
          }
        }
        console.log('Changes saved.');
      },
    },
  };
  </script>
  
  <style scoped>
  .materials-table {
    margin: 20px;
  }
  
  .table-heading {
    font-size: 50px;
    margin-bottom: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 8px;
    border: 1px solid black;
    text-align: left;
    font-size: 20px;
  }
  
  th {
    background-color: whitesmoke;
  }
  
  input {
    width: 90%;
    padding: 6px;
    font-size: 20;
  }
  
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  