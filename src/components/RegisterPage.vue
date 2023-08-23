<template>
    <div class="registration-container">

   <button @click="adminpage" class="Admin">Go back</button>

      <h2 class="registration-heading">Registration</h2>
      <form @submit.prevent="register" class="registration-form">
        <label for="newUsername">Username:</label>
        <input type="text" id="newUsername" v-model="newUsername" required><br>
  
        <label for="newPassword">Password:</label>
        <input type="password" id="newPassword" v-model="newPassword" required><br>
  
        <button type="submit" class="register-button">Register</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newUsername: '',
        newPassword: '',
        error: '',
      };
    },
  
     methods: {
      adminpage() {
        this.$router.push('/AdminPage');
      },
      async register() {
        try {
          const response = await axios.post('http://localhost:3000/api/users', {
            username: this.newUsername,
            password: this.newPassword,
          });
  
          if (response.data.success) {
            // Redirect to login page or another route
            this.$router.push('/login');
          } else {
            this.error = 'Registration failed';
          }
        } catch (error) {
          console.error('Error registering:', error);
          this.error = 'An error occurred during registration';
        }
    
      },
    },
  };
  </script>
  
  <style scoped>
  .registration-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .registration-heading {
    font-size: 24px;
    margin-bottom: 10px;
    text-align: center;
  }
  
  .registration-form {
    display: flex;
    flex-direction: column;
    size: 10;
    gap: 1px;
    
  }
  
  label {
    font-size: 18px;
  }
  
  .register-button {
    background-color: #8ad190;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    font-size: 16px;
    text-align: center;
  }
  </style>
  