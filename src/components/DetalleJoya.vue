<!-- src/components/DetalleJoya.vue -->
<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 900px; max-width: 95vw; border-radius: 12px; overflow: hidden">
      <!-- Contenedor dividido en 2 columnas -->
      <q-card-section class="row q-pa-none">
        <!-- Mitad izquierda: Imagen en grande -->
        <div class="col-12 col-md-6 bg-grey-1 flex flex-center relative-position">
          <img
            v-if="joya"
            :src="joya.imagen_url"
            :alt="joya.nombre"
            @error="repararImagen"
            style="width: 100%; height: 500px; object-fit: cover"
          />
        </div>

        <!-- Mitad derecha: Detalles de la joya -->
        <div class="col-12 col-md-6 q-pa-xl column" v-if="joya">
          <div
            class="text-overline text-secondary q-mb-sm text-weight-bold"
            style="letter-spacing: 2px"
          >
            ESMERALDIA
          </div>

          <h2
            class="text-h4 text-primary text-weight-bold q-mt-none q-mb-md"
            style="line-height: 1.2"
          >
            {{ joya.nombre }}
          </h2>

          <div class="text-h5 text-dark text-weight-medium q-mb-lg">{{ joya.precio }} €</div>

          <q-separator class="q-mb-lg" />

          <div class="text-body1 text-grey-8 q-mb-xl col-grow" style="line-height: 1.8">
            {{
              joya.descripcion ||
              'Una pieza única y elegante diseñada para destacar. Elaborada con los más altos estándares de calidad de la alta joyería.'
            }}
          </div>

          <!-- Botones de Acción -->
          <div class="row q-gutter-md">
            <q-btn
              unelevated
              color="primary"
              size="lg"
              class="col text-weight-bold"
              label="Añadir a la bolsa"
              icon="shopping_bag"
              @click="añadirYCerrar"
            />
            <q-btn
              outline
              :color="favoritos.esFavorito(joya.id) ? 'red' : 'grey-8'"
              size="lg"
              :icon="favoritos.esFavorito(joya.id) ? 'favorite' : 'favorite_border'"
              @click="favoritos.toggle(joya)"
            >
              <q-tooltip>Añadir a favoritos</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <!-- Botón X para cerrar (Flotante arriba a la derecha) -->
      <q-btn
        icon="close"
        flat
        round
        dense
        v-close-popup
        class="absolute-top-right q-ma-sm bg-white text-dark shadow-2"
        style="z-index: 10"
      />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { carrito, favoritos } from '../store'

// Recibimos si el modal está abierto (modelValue) y qué joya pintar (joya)
const props = defineProps({
  modelValue: Boolean,
  joya: Object,
})

const emit = defineEmits(['update:modelValue'])

// Añade al carrito y cierra la ventana para que puedas seguir comprando
const añadirYCerrar = () => {
  carrito.agregar(props.joya)
  emit('update:modelValue', false)
}

const repararImagen = (evento) => {
  evento.target.src = '/favicon.ico'
}
</script>
