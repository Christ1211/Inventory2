<template>
    <div>
      <div v-if="showLoginForm" class="login-container">
        <h2 class="login-title">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit" class="login-button">Login</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
      <div v-else class="logout-container">
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: '',
        showLoginForm: true,
      };
    },
    created() {
      const storedShowLoginForm = localStorage.getItem('showLoginForm');
      if (storedShowLoginForm !== null) {
        this.showLoginForm = JSON.parse(storedShowLoginForm);
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/api/login', {
            username: this.username,
            password: this.password,
          });
  
          if (response.data.success) {
            localStorage.setItem('loggedInUsername', this.username);
  
            if (this.username === 'Admin') {
              this.$router.push({ path: '/AdminPage', query: { redirectedAsAdmin: true } });
            } else {
              this.$router.push('/');
            }
            this.showLoginForm = false;
            localStorage.setItem('showLoginForm', JSON.stringify(this.showLoginForm));
          } else {
            this.error = 'Invalid username or password';
          }
        } catch (error) {
          console.error('Error logging in:', error);
          this.error = 'An error occurred while logging in';
        }
      },
      logout() {
        this.showLoginForm = true;
        localStorage.setItem('showLoginForm', JSON.stringify(this.showLoginForm));
        localStorage.removeItem('loggedInUsername');
        this.username = '';
        this.password = '';
        this.error = '';
        this.$router.push('/LoginPage');
      },
    },
  };
  </script>
  

  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .login-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 18px;
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login-button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .logout-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .logout-button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 100;
    background-color: #d3cdcc;
    color: rgb(15, 0, 0);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
  }
  </style>
  