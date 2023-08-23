<template>
    <div class="subtract-form">
      <h2 class="title">Create Project</h2>
  
      <!-- Project Name Input -->
      <div class="form-group">
        <label for="ProjectName" class="label">Project Name:</label>
        <input type="text" v-model="ProjectName" class="input" placeholder="Enter Project Name">
      </div>
  
      <!-- Item Selection and Amount Inputs -->
      <div v-for="(item, index) in selectedItems" :key="index" class="form-group">
        <label :for="`itemName${index}`" class="label">Select Item {{ index + 1 }}:</label>
        <select v-model="selectedItems[index]" class="select">
          <option value="" disabled>Select Item</option>
          <option v-for="item in items" :value="item.ItemName" :key="item.id">{{ item.ItemName }}</option>
        </select>
        <input type="number" v-model="subtractAmounts[index]" class="input" placeholder="Amount">
        <span class="item-price" v-if="selectedItems[index]">{{ getItemPrice(selectedItems[index]) }}</span>
      </div>
  
      <!-- Display calculated max price -->
      <div v-if="calculatedMaxPrice > 0" class="form-group">
        <label class="label">Calculated Max Price:</label>
        <span class="max-price">{{ calculatedMaxPrice }}</span>
      </div>
  
      <!-- Textarea for additional notes -->
      <div class="form-group">
        <label for="additionalNotes" class="label">Additional Notes:</label>
        <textarea v-model="additionalNotes" class="textarea" placeholder="Enter additional notes"></textarea>
      </div>
  
      <button @click="createProjectAndSubtract" class="btn">Save Project</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        items: [],
        selectedItems: ['', '', '', '', ''],
        subtractAmounts: ['', '', '', '', ''],
        ProjectName: '',
        additionalNotes: '', // Added data property for additional notes
      };
    },
    computed: {
      calculatedMaxPrice() {
        let totalPrice = 0;
        for (let i = 0; i < this.selectedItems.length; i++) {
          if (this.selectedItems[i]) {
            const item = this.items.find(item => item.ItemName === this.selectedItems[i]);
            if (item) {
              totalPrice += item.Price * this.subtractAmounts[i];
            }
          }
        }
        return totalPrice;
      }
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:3000/api/materials');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    methods: {
      getItemPrice(itemName) {
        const selectedItem = this.items.find(item => item.ItemName === itemName);
        return selectedItem ? selectedItem.Price : 0;
      },
      async createProjectAndSubtract() {
        if (!this.ProjectName) {
          console.error('Project name is required');
          return;
        }
  
        // Build project details
        const projectDetails = [];
        for (let i = 0; i < this.selectedItems.length; i++) {
          projectDetails.push(`${this.selectedItems[i]} (${this.subtractAmounts[i] || 0})`);
        }
  
        // Join items and amounts in the desired format
        const projectText = projectDetails.join(', ');
  
        // Append calculated max price and additional notes to project text
        const projectWithMaxPriceAndNotes = `${projectText} (Project Cost $: ${this.calculatedMaxPrice})\nAdditional Notes: ${this.additionalNotes}`;
  
        try {
          // Send data to the backend API to create the project and subtract inventory
          const response = await axios.post('http://localhost:3000/api/projects', {
            ProjectName: this.ProjectName,
            Text: projectWithMaxPriceAndNotes,  // Include calculated max price and notes in project text
            Items: this.selectedItems,     // Include selected items for inventory update
            Amounts: this.subtractAmounts, // Include subtracted amounts for inventory update
          });
  
          console.log('Project added:', response.data);
        } catch (error) {
          console.error('Error creating project:', error);
        }
  
        // Clear form fields after successful submission
        this.ProjectName = '';
        this.selectedItems = ['', '', '', '', ''];
        this.subtractAmounts = ['', '', '', '', ''];
        this.additionalNotes = ''; // Clear additional notes field
      },
    },
  };
  </script>
  
  <style scoped>
  .subtract-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  
  .input {
   width: 40;
   font-size: 10;
  }
  
  .select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .btn {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  