<!-- src/components/Habitaciones.vue -->
<template>
  <div>
    <h1>Gestión de Habitaciones</h1>
    
    <!-- Formulario para agregar una habitación -->
    <form @submit.prevent="agregarHabitacion">
      <input v-model="nuevaHabitacion.nombre" placeholder="Nombre" required />
      <input v-model="nuevaHabitacion.descripcion" placeholder="Descripción" required />
      <input v-model.number="nuevaHabitacion.precio" type="number" placeholder="Precio" required />
      <select v-model="nuevaHabitacion.disponibilidad">
        <option :value="true">Disponible</option>
        <option :value="false">No Disponible</option>
      </select>
      <button type="submit">Agregar Habitación</button>
    </form>

    <!-- Listado de habitaciones -->
    <ul>
      <li v-for="habitacion in habitaciones" :key="habitacion.id">
        <h2>{{ habitacion.nombre }} - ${{ habitacion.precio }}</h2>
        <p>{{ habitacion.descripcion }}</p>
        <p>Disponibilidad: {{ habitacion.disponibilidad ? 'Sí' : 'No' }}</p>
        
        <!-- Botones de acción -->
        <button @click="eliminarHabitacion(habitacion.id)">Eliminar</button>
        <button @click="editarHabitacion(habitacion)">Editar</button>
      </li>
    </ul>
    
    <!-- Modal de edición -->
    <div v-if="editando">
      <h3>Editar Habitación</h3>
      <form @submit.prevent="actualizarHabitacion">
        <input v-model="habitacionEditada.nombre" placeholder="Nombre" required />
        <input v-model="habitacionEditada.descripcion" placeholder="Descripción" required />
        <input v-model.number="habitacionEditada.precio" type="number" placeholder="Precio" required />
        <select v-model="habitacionEditada.disponibilidad">
          <option :value="true">Disponible</option>
          <option :value="false">No Disponible</option>
        </select>
        <button type="submit">Actualizar</button>
        <button @click="cancelarEdicion">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      habitaciones: [],
      nuevaHabitacion: {
        nombre: '',
        descripcion: '',
        precio: null,
        disponibilidad: true,
      },
      editando: false,
      habitacionEditada: null,
    };
  },
  methods: {
    async obtenerHabitaciones() {
      try {
        const response = await this.$axios.get('/habitaciones');
        this.habitaciones = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async agregarHabitacion() {
      try {
        const response = await this.$axios.post('/habitaciones', this.nuevaHabitacion);
        this.habitaciones.push(response.data);
        this.nuevaHabitacion = { nombre: '', descripcion: '', precio: null, disponibilidad: true };
      } catch (error) {
        console.error(error);
      }
    },
    async eliminarHabitacion(id) {
      try {
        await this.$axios.delete(`/habitaciones/${id}`);
        this.habitaciones = this.habitaciones.filter(h => h.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    editarHabitacion(habitacion) {
      this.editando = true;
      this.habitacionEditada = { ...habitacion };
    },
    async actualizarHabitacion() {
      try {
        const response = await this.$axios.put(`/habitaciones/${this.habitacionEditada.id}`, this.habitacionEditada);
        const index = this.habitaciones.findIndex(h => h.id === this.habitacionEditada.id);
        this.habitaciones[index] = response.data;
        this.cancelarEdicion();
      } catch (error) {
        console.error(error);
      }
    },
    cancelarEdicion() {
      this.editando = false;
      this.habitacionEditada = null;
    }
  },
  mounted() {
    this.obtenerHabitaciones();
  }
};
</script>

<style scoped>
@import '@/assets/styly.css';
</style>
