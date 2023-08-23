<template>
    <div class="users-table">
      <h2>Users Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>
              <input
                v-model="user.username"
                :disabled="user.isEditing"
              />
            </td>
            <td>
              <input
                v-model="user.password"
                :disabled="user.isEditing"
              />
            </td>
            <td>
              <button @click="editUser(user)" v-if="!user.isEditing">Edit</button>
              <button @click="saveUser(user)" v-else>Save</button>
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
        users: [],
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/api/users');
          this.users = response.data.map(user => ({ ...user, isEditing: false }));
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async updateUser(user) {
        try {
          await axios.put(`http://localhost:3000/api/users/${user.id}`, user);
          // Handle success or show notification
        } catch (error) {
          console.error('Error updating user:', error);
        }
      },
      editUser(user) {
        user.isEditing = true;
      },
      async saveUser(user) {
        user.isEditing = false;
        await this.updateUser(user);
      },
    },
  };
  </script>
  
  <style scoped>
  .users-table {
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
  