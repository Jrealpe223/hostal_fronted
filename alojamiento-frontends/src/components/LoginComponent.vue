<template>
  <div class="right-bar">
      <nav class="navbar2">
        <button @click="goToHome" class="btn2">Inicio</button>
      </nav>
    </div>
  <div class="container login">
    <h2>Login</h2>
    <form class="form-login" @submit.prevent="login">
      <!-- Correo electrónico -->
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" v-model="email" required />
      </div>

      <!-- Contraseña -->
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit" class="btn-login">Iniciar sesión</button>
    </form>
    <p class="register-link">¿Aun no tienes una cuenta? <a href="/register">Regístrate</a></p>
  </div>
</template>

<script>
import axios from 'axios'; // Importar Axios

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    goToHome() {
      this.$router.push('/home');
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/v1/users/login', {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {
          alert('Inicio de sesión exitoso');
          this.$router.push('/rooms')
        } else {
          alert('Error: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de servidor');
      }
    },
  },
};
</script>

<style>
@import '@/assets/styly.css';
</style>