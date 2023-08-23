<template>
  <div class="add-materials-container">
    <h2 class="add-materials-title">Add Materials</h2>
    <form @submit.prevent="addMaterial" class="add-materials-form">
      <label for="ItemName" class="form-label">Item Name:</label>
      <input type="text" id="ItemName" v-model="ItemName" required class="form-input">

      <label for="Price" class="form-label">Price:</label>
      <input type="number" id="Price" v-model="Price" required class="form-input">

      <label for="Amount" class="form-label">Amount:</label>
      <input type="number" id="Amount" v-model="Amount" required class="form-input">

      <button type="submit" class="form-button">Add Material</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ItemName: '',
      Price: null,
      Amount: null,
      materialsApiUrl: 'http://localhost:3000/api/materials', // Change this URL to match your API endpoint
    };
  },
  methods: {
    async addMaterial() {
      try {
        const materialsResponse = await axios.get(this.materialsApiUrl);
        const existingMaterial = materialsResponse.data.find(material => material.itemname === this.ItemName);

        const payload = {
          itemname: this.ItemName,
          price: this.Price,
          amount: this.Amount,
        };

        if (existingMaterial) {
          payload.id = existingMaterial.id; // Include the ID of existing material to update
          await axios.put(`${this.materialsApiUrl}/${existingMaterial.id}`, payload);
        } else {
          await axios.post(this.materialsApiUrl, payload);
        }

        console.log('Material added/updated');
        this.clearFormFields();
      } catch (error) {
        console.error('Error adding/updating material:', error);
      }
    },
    clearFormFields() {
      this.ItemName = '';
      this.Price = null;
      this.Amount = null;
    }
  }
}
</script>

<style scoped>
.add-materials-container {
 
  
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.add-materials-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  background-color: gainsboro;
}

.add-materials-form {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #0056b3;
}
</style>
