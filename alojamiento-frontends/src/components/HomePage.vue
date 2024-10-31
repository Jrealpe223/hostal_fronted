<template>
  
    <!-- Contenedor de inicio de sesión y registro -->
    <div class="right-bar">
      <nav class="navbar">
        <button @click="goToLogin" class="btn2">Iniciar Sesión</button>
        <button @click="goToRegister" class="btn2">Regístrate</button>
      </nav>
    </div>
    <div class="container home">
          <!-- Formulario de búsqueda de hoteles -->
      <h2>Busca hoteles en tu destino</h2>
      <form class="form-home" @submit.prevent="searchHotels">
        <div class="form-group">
          <label for="destination">Destino</label>
          <input type="text" v-model="destination" placeholder="¿A dónde viajas?" required />
        </div>

        <div class="form-group">
          <label for="check_in">Fecha de entrada</label>
          <input type="date" v-model="check_in" required />
        </div>

        <div class="form-group">
          <label for="check_out">Fecha de salida</label>
          <input type="date" v-model="check_out" required />
        </div>

        <div class="form-group">
          <label for="guests">Huéspedes</label>
          <input type="number" v-model="guests" min="1" required />
        </div>

        <div class="form-group">
          <label for="rooms">Habitaciones</label>
          <input type="number" v-model="rooms" min="1" required />
        </div>

        <button type="submit" class="btn-home">Buscar</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      destination: '',
      check_in: '',
      check_out: '',
      guests: 1,
      rooms: 1,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login'); // Navega a la ruta de inicio de sesión
    },
    goToRegister() {
      this.$router.push('/register'); // Navega a la ruta de registro
    },
    async searchHotels() {
      try {
        const response = await axios.post('http://localhost:8080/v1/hotels/search', {
          destination: this.destination,
          check_in: this.check_in,
          check_out: this.check_out,
          guests: this.guests,
          rooms: this.rooms,
        });

        if (response.status === 200) {
          // Maneja la respuesta, por ejemplo, mostrar los resultados
          alert('Búsqueda exitosa');
          console.log(response.data); // Aquí puedes manejar la respuesta, como mostrar la lista de hoteles
        } else {
          alert('Error: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error del servidor:', error);
        alert('Error al buscar hoteles');
      }
    }
  }
};
</script>

<style>
@import '@/assets/styly.css';
</style>
