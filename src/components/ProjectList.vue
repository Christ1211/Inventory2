<template>
  <div class="Projects-table">
    <h2>Projects</h2>
    <table>
      <thead>
        <tr>
          <th class="id">ID</th>
          <th class="proj">Project Name</th>
          <th class="mats">Project Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.ProjectName }}</td>
          <td v-html="formatProjectDetails(project.Text)"></td>
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
        this.projects = response.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    formatProjectDetails(text) {
      // Remove (0) from project details and make "Project Cost $" bold
      return text.replace(/\s*\(0\)/g, '').replace('Project Cost $:', '<strong>Project Cost $:</strong>')
      .replace('Additional Notes:', '<br><br><strong>Additional Notes:</strong>')
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
.mats {
  width: 50%;
}
.proj {
  width: 20%;
}
.id{
  width: 5%;
}
</style>
