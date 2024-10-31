<template>
  <div class="right-bar">
      <nav class="navbar2">
        <button @click="goToHome" class="btn2">Inicio</button>
      </nav>
    </div>
  <div class="container register"> <!-- Clase container añadida -->
    <h2>Register</h2>
    <form class="form-register" @submit.prevent="register"> <!-- Clase form-register añadida -->
      <!-- Nombre -->
      <div class="form-group"> <!-- Clase form-group añadida -->
        <label for="first_name">Nombre Completo</label>
        <input type="text" v-model="first_name" required />
      </div>

      <!-- Apellido -->
      <div class="form-group"> <!-- Clase form-group añadida -->
        <label for="last_name">Apellido Completo</label>
        <input type="text" v-model="last_name" required />
      </div>

      <!-- Correo electrónico -->
      <div class="form-group"> <!-- Clase form-group añadida -->
        <label for="email">Correo electrónico</label>
        <input type="email" v-model="email" required />
      </div>

      <!-- Número de teléfono -->
      <div class="form-group"> <!-- Clase form-group añadida -->
        <label for="phone">Número de teléfono</label>
        <input type="tel" v-model="phone" required />
      </div>

      <!-- Contraseña -->
      <div class="form-group"> <!-- Clase form-group añadida -->
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" required />
      </div>

      <!-- Confirmar contraseña -->
      <div class="form-group"> <!-- Clase form-group añadida -->
        <label for="password_confirmation">Confirmar contraseña</label>
        <input type="password" v-model="password_confirmation" required />
      </div>

      <!-- Casilla para aceptar la política de tratamiento de datos -->
      <div class="form-group"> <!-- Clase form-group añadida -->
        <label>
          <input type="checkbox" v-model="acceptsPolicy" />
          Acepto la política de tratamiento de datos
        </label>
      </div>

      <button type="submit" class="btn-register">Registrar</button> <!-- Clase btn-register añadida -->
    </form>
    <p class="register-link">¿Ya tienes una cuenta? <a href="/login">Ingresa</a></p>
  </div>
</template>

<script>
import axios from 'axios'; // Importar Axios

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      acceptsPolicy: false, // Nuevo campo para aceptar la política de datos
    };
  },
  methods: {
    goToHome() {
      this.$router.push('/home');
    },
    async register() {
      if (!this.acceptsPolicy) {
        alert('Debes aceptar la política de tratamiento de datos.');
        return;
      }

      if (this.password !== this.password_confirmation) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/v1/users/save', {
          firstName: this.first_name,
          lastName: this.last_name,
          email: this.email,
          phone: this.phone,
          password: this.password,
          privacy: this.acceptsPolicy, // Enviar el valor al backend
          admin: false,
        });
        

        if (response.status === 200) {
          alert('Usuario registrado con éxito');
          this.$router.push('/rooms')
        } else {
          alert('Error: ' + response.data.message);
        }
      } 
      catch (error) {
  if (error.response && error.response.status === 422) {
    console.error('Errores de validación:', error.response.data.errors);
    alert('Hay un problema con los datos enviados. Revisa los campos.');
  } else {
    console.error('Error del servidor:', error);
    alert('Error del servidor');
  }
}

    },
  },
};
</script >

<style>
@import '@/assets/styly.css';
</style>

