<template>
    <div>
      <button @click="goToInputItems" class="back-button">Go to Input Items</button>
      <button @click="AddUser" class="user">Create new user</button>
      <h1>Inventory</h1>

      <div v-if="userIsAdmin || redirectedAsAdmin" class="Mats-table">
      </div>
      <div v-else class =overlay>
        <p>You do not have permission to access this page.</p>
      </div>
    </div>
  
      <AdminMaterials :apiUrl="'http://localhost:3000/api/materials'" />
      <AdminProjList :apiUrl="'http://localhost:3000/api/projects'" />
      <AdminUsers :apiUrl="'http://localhost:3000/api/users'" />
  
      
  </template>
  
  <script>
  import AdminMaterials from './AdminMaterials.vue';
  import AdminUsers from './AdminUsers.vue';
  import AdminProjList from './AdminProjList.vue';
  import axios from 'axios';
  
  export default {
    components: {
    AdminMaterials,
    AdminProjList,
      AdminUsers,
    },
    data() {
      return {
        userIsAdmin: false,
        redirectedAsAdmin: false,
      };
    },
    async mounted() {
      this.fetchAdminStatus(); // Check if the logged-in user is an admin
    },
    methods: {
      goToInputItems() {
        this.$router.push('/AdminInput');
      },
      AddUser() {
        this.$router.push('/Register'); // Redirect to InputItems.vue
      },
      async fetchAdminStatus() {
        try {
          const response = await axios.get('http://localhost:3000/api/users');
          this.userIsAdmin = response.data.isAdmin;
  
          // Check if user was redirected as admin
          const redirected = this.$route.query.redirectedAsAdmin === 'true';
          this.redirectedAsAdmin = redirected;
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .back-button {
    position: absolute;
    top: 400px;
    left: 50px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 100;
    background-color: #8ad190;
    color: rgb(15, 0, 0);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .user {
    position: absolute;
    top: 400px;
    left: 250px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 100;
    background-color: #8ad190;
    color: rgb(15, 0, 0);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.overlay p {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
}
</style>







  