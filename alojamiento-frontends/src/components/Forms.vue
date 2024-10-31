<template>
    <section id="formulario">
        <h2>Contacto</h2>
        <div class="container">
            <form @submit.prevent="enviar" class="form-register">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" v-model="nombre" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="mensaje">Mensaje:</label>
                    <textarea v-model="mensaje" required></textarea>
                </div>
                <button type="submit" class="btn-register">Enviar</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            nombre: '',
            email: '',
            mensaje: ''
        };
    },
    methods: {
        enviar() {
            this.$emit('enviar');
            this.nombre = '';
            this.email = '';
            this.mensaje = '';
        }
    }
}
</script>
