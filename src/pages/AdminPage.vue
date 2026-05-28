<!-- src/pages/AdminPage.vue -->
<template>
  <q-page class="q-pa-lg">
    <!-- Cabecera del Panel -->
    <div class="row justify-between items-center q-mb-md">
      <div>
        <div class="text-h4 text-primary q-mb-xs">Panel de Administración</div>
        <p class="text-grey-8 q-ma-none">Aquí podrás gestionar el inventario de la joyería.</p>
      </div>
      <!-- Botón para añadir nueva joya -->
      <q-btn color="primary" icon="add" label="Añadir Joya" @click="abrirFormulario()" />
    </div>

    <!-- Tabla del Catálogo -->
    <q-table
      title="Catálogo de Joyas"
      :rows="joyas"
      :columns="columnas"
      row-key="id"
      class="q-mt-lg shadow-2"
      style="border: 2px solid var(--q-secondary)"
      :loading="cargando"
      rows-per-page-label="Joyas por página:"
    >
      <!-- Columna personalizada para la imagen -->
      <template v-slot:body-cell-imagen="props">
        <q-td :props="props">
          <img
            :src="props.row.imagen_url"
            style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px"
            @error="repararImagen"
          />
        </q-td>
      </template>

      <!-- Columna personalizada para los botones de acción -->
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <q-btn flat round color="positive" icon="edit" @click="abrirFormulario(props.row)">
            <q-tooltip>Editar joya</q-tooltip>
          </q-btn>
          <q-btn flat round color="negative" icon="delete" @click="eliminarJoya(props.row.id)">
            <q-tooltip>Eliminar joya</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Formulario Modal para Añadir / Editar -->
    <q-dialog v-model="mostrarModal" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">{{ modoEdicion ? 'Editar Joya' : 'Añadir Nueva Joya' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit.prevent="guardarJoya" class="q-gutter-md">
            <!-- Campos del formulario -->
            <q-input
              outlined
              v-model="formulario.nombre"
              label="Nombre de la Joya *"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'El nombre es obligatorio']"
            />

            <q-input
              outlined
              v-model.number="formulario.precio"
              type="number"
              label="Precio (€) *"
              lazy-rules
              :rules="[(val) => (val !== null && val !== '') || 'El precio es obligatorio']"
            />

            <q-input
              outlined
              v-model="formulario.descripcion"
              type="textarea"
              label="Descripción"
              autogrow
            />

            <q-input
              outlined
              v-model="formulario.imagen_url"
              label="URL de la imagen"
              hint="Pega el enlace a la foto (si lo dejas vacío saldrá el logo)"
            />

            <!-- Botones Guardar / Cancelar -->
            <div class="row justify-end q-gutter-sm q-mt-md">
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
              <q-btn
                unelevated
                label="Guardar"
                color="primary"
                type="submit"
                :loading="guardando"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

// Variables de estado
const joyas = ref([])
const cargando = ref(false)
const guardando = ref(false)
const mostrarModal = ref(false)
const modoEdicion = ref(false)

// Estructura de nuestro formulario
const formulario = ref({
  id: null,
  nombre: '',
  precio: '',
  descripcion: '',
  imagen_url: '',
})

// Configuración de las columnas de la tabla
const columnas = [
  { name: 'imagen', label: 'Foto', align: 'left', field: 'imagen_url' },
  { name: 'nombre', label: 'Nombre de la Joya', align: 'left', field: 'nombre', sortable: true },
  { name: 'precio', label: 'Precio (€)', align: 'center', field: 'precio', sortable: true },
  { name: 'acciones', label: 'Acciones', align: 'center' },
]

// Cargar joyas al entrar en la página
onMounted(() => {
  obtenerJoyas()
})

// Función para descargar los datos de Supabase
const obtenerJoyas = async () => {
  cargando.value = true
  const { data, error } = await supabase.from('joyas').select('*').order('id', { ascending: false })

  if (error) {
    console.error('Error al cargar las joyas:', error)
    alert('Hubo un error al cargar los datos.')
  } else {
    joyas.value = data
  }
  cargando.value = false
}

// Función para abrir el formulario (sirve para crear y para editar)
const abrirFormulario = (joya = null) => {
  if (joya) {
    // Si pasamos una joya, estamos editando
    modoEdicion.value = true
    formulario.value = { ...joya } // Copiamos los datos de la joya al formulario
  } else {
    // Si no pasamos nada, estamos creando una nueva
    modoEdicion.value = false
    formulario.value = {
      id: null,
      nombre: '',
      precio: '',
      descripcion: '',
      imagen_url: '',
    }
  }
  mostrarModal.value = true
}

// Función para guardar en la base de datos (Supabase)
const guardarJoya = async () => {
  guardando.value = true

  // Limpiamos los datos a enviar
  const datosJoya = {
    nombre: formulario.value.nombre,
    precio: formulario.value.precio,
    descripcion: formulario.value.descripcion,
    imagen_url: formulario.value.imagen_url || '',
  }

  let errorSupabase = null

  if (modoEdicion.value) {
    // ACTUALIZAR
    const { error } = await supabase.from('joyas').update(datosJoya).eq('id', formulario.value.id)
    errorSupabase = error
  } else {
    // CREAR NUEVA
    const { error } = await supabase.from('joyas').insert([datosJoya])
    errorSupabase = error
  }

  guardando.value = false

  if (errorSupabase) {
    console.error('Error guardando joya:', errorSupabase)
    alert('Error al guardar la joya.')
  } else {
    mostrarModal.value = false
    obtenerJoyas() // Recargamos la tabla para ver los cambios
  }
}

// Función para eliminar con aviso de confirmación
const eliminarJoya = async (id) => {
  const confirmar = confirm(
    '¿Estás seguro de que quieres eliminar esta joya? Esta acción no se puede deshacer.',
  )

  if (confirmar) {
    cargando.value = true
    const { error } = await supabase.from('joyas').delete().eq('id', id)

    if (error) {
      console.error('Error al eliminar:', error)
      alert('Hubo un error al intentar eliminar la joya.')
    } else {
      obtenerJoyas() // Recargamos la tabla para que desaparezca
    }
    cargando.value = false
  }
}

// Si la imagen falla, muestra el logo por defecto
const repararImagen = (evento) => {
  evento.target.src = '/favicon.ico'
}
</script>
