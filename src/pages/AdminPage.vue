<!-- src/pages/AdminPage.vue -->
<template>
  <q-page class="q-pa-md q-pa-sm-lg">
    <!-- Cabecera del Panel Adaptable -->
    <div class="row justify-between items-center q-mb-md q-gutter-y-md">
      <div class="col-12 col-sm-8">
        <div class="text-h4 text-primary q-mb-xs">Panel de Administración</div>
        <p class="text-grey-8 q-ma-none">Aquí podrás gestionar el inventario de la joyería.</p>
      </div>
      <!-- Botón para añadir nueva joya (Ocupa todo el ancho en móvil) -->
      <div class="col-12 col-sm-auto text-right">
        <!-- class="full-width" solo afectará en móviles gracias al grid de Quasar -->
        <q-btn
          color="primary"
          icon="add"
          label="Añadir Joya"
          @click="abrirFormulario()"
          class="full-width"
        />
      </div>
    </div>

    <!-- Tabla del Catálogo (Se hace Grid en móviles automáticamente con $q.screen.xs) -->
    <q-table
      title="Catálogo de Joyas"
      :rows="joyas"
      :columns="columnas"
      row-key="id"
      class="q-mt-lg shadow-2"
      style="border: 2px solid var(--q-secondary)"
      :loading="cargando"
      rows-per-page-label="Joyas por página:"
      :grid="$q.screen.xs"
    >
      <!-- DISEÑO PARA ORDENADOR (Columnas de la tabla clásica) -->
      <template v-slot:body-cell-imagen="props">
        <q-td :props="props">
          <img
            :src="props.row.imagen_url"
            style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px"
            @error="repararImagen"
          />
        </q-td>
      </template>

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

      <!-- DISEÑO PARA MÓVIL (Tarjetas en lugar de filas) -->
      <template v-slot:item="props">
        <div class="q-pa-xs col-12">
          <q-card bordered flat>
            <q-card-section class="row items-center q-gutter-sm">
              <img
                :src="props.row.imagen_url"
                style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px"
                @error="repararImagen"
              />

              <div class="col">
                <div class="text-weight-bold text-primary" style="line-height: 1.2">
                  {{ props.row.nombre }}
                </div>
                <div class="text-secondary text-weight-bold q-mt-xs">{{ props.row.precio }} €</div>
              </div>

              <div class="col-auto column q-gutter-y-xs">
                <q-btn
                  flat
                  round
                  dense
                  color="positive"
                  icon="edit"
                  @click="abrirFormulario(props.row)"
                />
                <q-btn
                  flat
                  round
                  dense
                  color="negative"
                  icon="delete"
                  @click="eliminarJoya(props.row.id)"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>

    <!-- Formulario Modal para Añadir / Editar -->
    <q-dialog v-model="mostrarModal" persistent>
      <!-- CORRECCIÓN: Quitamos el min-width que rompía móviles y usamos max-width -->
      <q-card style="width: 100%; max-width: 500px">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">{{ modoEdicion ? 'Editar Joya' : 'Añadir Nueva Joya' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit.prevent="guardarJoya" class="q-gutter-md">
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

            <!-- Ahora el ejemplo del hint indica una ruta local -->
            <q-input
              outlined
              v-model="formulario.imagen_url"
              label="URL de la imagen"
              hint="Ej: /img/anillo.jpg o un enlace de internet"
            />

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
import { useQuasar } from 'quasar'
import { supabase } from '../supabase'

// Importamos la herramienta de Quasar para detectar el tamaño de la pantalla
const $q = useQuasar()

// Variables de estado
const joyas = ref([])
const cargando = ref(false)
const guardando = ref(false)
const mostrarModal = ref(false)
const modoEdicion = ref(false)

const formulario = ref({
  id: null,
  nombre: '',
  precio: '',
  descripcion: '',
  imagen_url: '',
})

const columnas = [
  { name: 'imagen', label: 'Foto', align: 'left', field: 'imagen_url' },
  { name: 'nombre', label: 'Nombre de la Joya', align: 'left', field: 'nombre', sortable: true },
  { name: 'precio', label: 'Precio (€)', align: 'center', field: 'precio', sortable: true },
  { name: 'acciones', label: 'Acciones', align: 'center' },
]

onMounted(() => {
  obtenerJoyas()
})

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

const abrirFormulario = (joya = null) => {
  if (joya) {
    modoEdicion.value = true
    formulario.value = { ...joya }
  } else {
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

const guardarJoya = async () => {
  guardando.value = true

  const datosJoya = {
    nombre: formulario.value.nombre,
    precio: formulario.value.precio,
    descripcion: formulario.value.descripcion,
    imagen_url: formulario.value.imagen_url || '',
  }

  let errorSupabase = null

  if (modoEdicion.value) {
    const { error } = await supabase.from('joyas').update(datosJoya).eq('id', formulario.value.id)
    errorSupabase = error
  } else {
    const { error } = await supabase.from('joyas').insert([datosJoya])
    errorSupabase = error
  }

  guardando.value = false

  if (errorSupabase) {
    console.error('Error guardando joya:', errorSupabase)
    alert('Error al guardar la joya.')
  } else {
    mostrarModal.value = false
    obtenerJoyas()
  }
}

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
      obtenerJoyas()
    }
    cargando.value = false
  }
}

const repararImagen = (evento) => {
  evento.target.src = '/favicon.ico'
}
</script>
