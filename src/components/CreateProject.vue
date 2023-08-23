<template>
  <div class="create-project-container">
    <h2 class="title">Create Project</h2>

    <div class="form-group">
      <label for="projectName" class="label">Project Name:</label>
      <input type="text" id="projectName" v-model="projectName" class="input" required>
    </div>

    <div v-for="(item, index) in 8" :key="index" class="form-group">
      <label class="label">Material {{ index + 1 }}:</label>
      <select v-model="selectedItems[index]" class="select">
        <option value="" disabled>Materials</option>
        <option v-for="item in items" :value="item.ItemName" :key="item.id">{{ item.ItemName }}</option>
      </select>
      <input type="text" v-model="selectedItemAmounts[index]" class="input" placeholder="Amount">
    </div>

    <button @click="addProject" class="btn">Create Project</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      projectName: '',
      items: [],
      selectedItems: ['', '', '', '', '', '', '', ''],
      selectedItemAmounts: ['', '', '', '', '', '', '', ''],
    };
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
    async addProject() {
      try {
        const payload = {
          ProjectName: this.projectName,
        };
        
        for (let i = 1; i <= 8; i++) {
          if (this.selectedItems[i - 1]) {
            payload[`item_${i}`] = this.selectedItems[i - 1];
            payload[`item_${i}_amount`] = this.selectedItemAmounts[i - 1];
          }
        }
        
        const response = await axios.post('http://localhost:3000/api/projectsdb', payload);
        console.log('Project added:', response.data);
        
        this.clearFormFields();
      } catch (error) {
        console.error('Error adding project:', error);
      }
    },
    clearFormFields() {
      this.projectName = '';
      this.selectedItems = ['', '', '', '', '', '', '', ''];
      this.selectedItemAmounts = ['', '', '', '', '', '', '', ''];
    }
  }
};
</script>

<style scoped>
.create-project-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  font-size: 18px;
  display: block;
  margin-bottom: 5px;
}

.input, .select {
  font-size: 16px;
  padding: 5px;
  width: 60%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.btn {
  font-size: 16px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>