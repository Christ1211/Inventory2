<template>
  <div class="Users-table">
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th class="id">ID</th>
          <th class="username">Username</th>
          <th class="password">Password</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>
            <input v-model="user.username" :disabled="!user.editing" />
          </td>
          <td>
            <input v-model="user.password" :disabled="!user.editing" />
          </td>
          <td>
            <button @click="editUser(index)" v-if="!user.editing">Edit</button>
            <button @click="saveUser(index)" v-else>Save</button>
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
      users: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.users = response.data.map(user => ({ ...user, editing: false }));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    editUser(index) {
      this.users[index].editing = true;
    },
    async saveUser(index) {
      try {
        const user = this.users[index];
        const response = await axios.put(`http://localhost:3000/api/users/${user.id}`, user);
        if (response.status === 200) {
          this.users[index].editing = false;
        }
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  }
};
</script>

<style scoped>
.Users-table {
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
