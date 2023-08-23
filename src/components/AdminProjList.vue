<template>
    <div class="Projects-table">
      <h2>Projects</h2>
      <table>
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="proj">Project Name</th>
            <th class="details">Project Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="project.id">
            <td>{{ project.id }}</td>
            <td>
              <input v-model="project.ProjectName" :disabled="!project.editing" />
            </td>
            <td>
              <textarea
                v-model="project.Text"
                :disabled="!project.editing"
                class="full-height-textarea"
              ></textarea>
            </td>
            <td>
              <button @click="editProject(index)" v-if="!project.editing">Edit</button>
              <button @click="saveProject(index)" v-else>Save</button>
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
      projects: []
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('http://localhost:3000/api/projects');
        this.projects = response.data.map(project => ({ ...project, editing: false }));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    editProject(index) {
      this.projects[index].editing = true;
    },
    async saveProject(index) {
      try {
        const project = this.projects[index];
        const response = await axios.put(`http://localhost:3000/api/projects/${project.id}`, project);
        if (response.status === 200) {
          this.projects[index].editing = false;
        }
      } catch (error) {
        console.error('Error saving project:', error);
      }
    }
  }
};
</script>

<style scoped>
.Projects-table {
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

/* Custom styling for the full-height textarea */
.full-height-textarea {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  resize: vertical;
}
</style>