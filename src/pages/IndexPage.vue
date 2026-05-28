<!-- src/pages/IndexPage.vue -->
<template>
  <q-page class="bg-white q-pa-md">
    <div class="flex flex-center q-mb-md">
      <q-btn-group outline style="border: 1px solid var(--q-secondary)">
        <q-btn
          :color="filtro === 'Todos' ? 'primary' : 'white'"
          :text-color="filtro === 'Todos' ? 'white' : 'primary'"
          label="Todos"
          @click="filtro = 'Todos'"
        />
        <q-btn
          :color="filtro === 'Anillo' ? 'primary' : 'white'"
          :text-color="filtro === 'Anillo' ? 'white' : 'primary'"
          label="Anillos"
          @click="filtro = 'Anillo'"
        />
        <q-btn
          :color="filtro === 'Collar' ? 'primary' : 'white'"
          :text-color="filtro === 'Collar' ? 'white' : 'primary'"
          label="Collares"
          @click="filtro = 'Collar'"
        />
        <q-btn
          :color="filtro === 'Pendientes' ? 'primary' : 'white'"
          :text-color="filtro === 'Pendientes' ? 'white' : 'primary'"
          label="Pendientes"
          @click="filtro = 'Pendientes'"
        />
      </q-btn-group>
    </div>

    <div v-if="busquedaActiva" class="text-center q-mb-lg">
      <span class="text-h6 text-grey-8"
        >Resultados para: <strong>"{{ busquedaActiva }}"</strong></span
      >
      <q-btn
        flat
        color="negative"
        icon="close"
        label="Limpiar búsqueda"
        size="sm"
        class="q-ml-sm"
        @click="limpiarBusqueda"
      />
    </div>

    <div class="row q-col-gutter-lg justify-center">
      <div v-if="joyasFiltradas.length === 0" class="col-12 text-center q-py-xl">
        <q-icon name="search_off" size="64px" color="grey-4" />
        <div class="text-h5 text-grey-6 q-mt-md">No se encontraron joyas con esos términos.</div>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="joya in joyasFiltradas" :key="joya.id">
        <q-card class="joya-card column full-height">
          <!-- Hacemos que la imagen sea clickeable (cursor-pointer) -->
          <img
            :src="joya.imagen_url"
            :alt="joya.nombre"
            @error="repararImagen"
            @click="abrirDetalles(joya)"
            class="cursor-pointer"
            style="height: 250px; object-fit: cover; width: 100%; transition: opacity 0.3s"
            onmouseover="this.style.opacity = '0.8'"
            onmouseout="this.style.opacity = '1'"
          />

          <q-card-section class="col-grow cursor-pointer" @click="abrirDetalles(joya)">
            <div
              class="text-h6 text-primary text-weight-bold hover-text-secondary"
              style="line-height: 1.2; transition: color 0.3s"
            >
              {{ joya.nombre }}
            </div>
            <div class="text-subtitle1 text-secondary q-mt-sm font-weight-bold">
              {{ joya.precio }} €
            </div>
          </q-card-section>

          <q-card-actions
            class="q-pa-md row justify-between items-center"
            style="border-top: 1px solid #eee"
          >
            <q-btn
              flat
              round
              dense
              :color="favoritos.esFavorito(joya.id) ? 'red' : 'grey-5'"
              :icon="favoritos.esFavorito(joya.id) ? 'favorite' : 'favorite_border'"
              @click="favoritos.toggle(joya)"
            />
            <q-btn
              outline
              label="Añadir"
              color="primary"
              icon="shopping_bag"
              @click="carrito.agregar(joya)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- NUESTRO NUEVO COMPONENTE INYECTADO AQUÍ -->
    <DetalleJoya v-model="modalDetalles" :joya="joyaSeleccionada" />
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase'
import { carrito, favoritos } from '../store'
// Importamos el componente
import DetalleJoya from '../components/DetalleJoya.vue'

const route = useRoute()
const router = useRouter()

const joyas = ref([])
const filtro = ref('Todos')

// Variables para el Modal
const modalDetalles = ref(false)
const joyaSeleccionada = ref(null)

onMounted(async () => {
  const { data } = await supabase.from('joyas').select('*')
  if (data) joyas.value = data
})

const busquedaActiva = computed(() => route.query.q || '')

const joyasFiltradas = computed(() => {
  let resultado = joyas.value
  if (filtro.value !== 'Todos') {
    resultado = resultado.filter((j) => j.nombre.toLowerCase().includes(filtro.value.toLowerCase()))
  }
  if (busquedaActiva.value) {
    const termino = busquedaActiva.value.toLowerCase()
    resultado = resultado.filter(
      (j) =>
        j.nombre.toLowerCase().includes(termino) ||
        (j.descripcion && j.descripcion.toLowerCase().includes(termino)),
    )
  }
  return resultado
})

const limpiarBusqueda = () => {
  router.push({ path: '/' })
}

const repararImagen = (evento) => {
  evento.target.src = '/favicon.ico'
}

// Función que se lanza al hacer clic en la foto o título de una joya
const abrirDetalles = (joya) => {
  joyaSeleccionada.value = joya
  modalDetalles.value = true
}
</script>

<style scoped>
.joya-card {
  border: 2px solid var(--q-secondary);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.joya-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
.hover-text-secondary:hover {
  color: var(--q-secondary) !important;
}
</style>
