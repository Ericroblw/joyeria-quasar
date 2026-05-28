<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="lHh Lpr lff" class="column min-height-screen">
    <!-- HEADER ESTILO TIENDA ELEGANTE -->
    <q-header class="bg-white text-dark" style="border-bottom: 1px solid #e0e0e0">
      <q-toolbar class="q-px-lg q-py-sm row items-center" style="min-height: 80px">
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="lt-md q-mr-sm"
          @click="menuIzquierdo = !menuIzquierdo"
        />

        <!-- IZQUIERDA: LOGO -->
        <div class="col-auto">
          <router-link
            to="/"
            class="text-h4 text-weight-bold font-serif text-primary"
            style="text-decoration: none"
          >
            Esmeraldia
          </router-link>
        </div>

        <!-- CENTRO: ENLACES -->
        <div
          class="col row justify-center gt-sm q-gutter-x-sm text-weight-medium"
          style="letter-spacing: 1px"
        >
          <q-btn
            flat
            no-caps
            label="JOYAS"
            to="/"
            exact
            exact-active-class="nav-active"
            class="nav-link"
          />
          <q-btn
            flat
            no-caps
            label="MUNDO ESMERALDIA"
            to="/esmeraldas"
            exact
            exact-active-class="nav-active"
            class="nav-link"
          />
          <q-btn flat no-caps label="NOVEDADES" class="nav-link" />
          <q-btn flat no-caps label="RELOJES" class="nav-link" />
          <q-btn flat no-caps label="IDEAS REGALO" class="nav-link" />
        </div>

        <!-- DERECHA: ICONOS -->
        <div class="col-auto row q-gutter-x-sm">
          <q-btn flat round dense icon="search" class="icon-btn" @click="dialogBusqueda = true" />

          <q-btn
            flat
            round
            dense
            icon="person"
            to="/admin"
            exact
            exact-active-class="text-secondary"
            class="icon-btn"
          >
            <q-tooltip>Panel de Administración</q-tooltip>
          </q-btn>

          <!-- Botón de Favoritos (NUEVO) -->
          <q-btn
            flat
            round
            dense
            :icon="favoritos.items.length > 0 ? 'favorite' : 'favorite_border'"
            :color="favoritos.items.length > 0 ? 'red' : 'dark'"
            class="icon-btn"
            @click="menuFavoritos = !menuFavoritos"
          >
            <q-badge color="secondary" floating v-if="favoritos.items.length > 0">
              {{ favoritos.items.length }}
            </q-badge>
          </q-btn>

          <q-btn
            flat
            round
            dense
            icon="shopping_bag"
            class="icon-btn"
            @click="menuCarrito = !menuCarrito"
          >
            <q-badge color="secondary" floating v-if="carrito.items.length > 0">
              {{ carrito.items.length }}
            </q-badge>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- MENÚ IZQUIERDO (Móvil) -->
    <q-drawer v-model="menuIzquierdo" bordered class="bg-grey-1 text-dark" :width="250">
      <q-list class="q-py-md">
        <q-item-label header class="text-weight-bold">Menú</q-item-label>
        <q-item clickable to="/" exact active-class="text-secondary">
          <q-item-section avatar><q-icon name="diamond" color="primary" /></q-item-section>
          <q-item-section>Joyas</q-item-section>
        </q-item>
        <q-item clickable to="/esmeraldas" exact active-class="text-secondary">
          <q-item-section avatar><q-icon name="auto_awesome" color="secondary" /></q-item-section>
          <q-item-section>Mundo Esmeraldia</q-item-section>
        </q-item>
        <q-item clickable to="/admin" exact active-class="text-secondary">
          <q-item-section avatar><q-icon name="person" color="primary" /></q-item-section>
          <q-item-section>Administración</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- MENÚ FAVORITOS (NUEVO) -->
    <q-drawer v-model="menuFavoritos" side="right" bordered>
      <div
        class="q-pa-md text-h6 text-red text-center"
        style="border-bottom: 2px solid var(--q-secondary)"
      >
        Tus Favoritos
      </div>
      <q-list separator>
        <q-item v-if="favoritos.items.length === 0">
          <q-item-section class="text-grey text-center q-pa-md"
            >No tienes favoritos aún</q-item-section
          >
        </q-item>
        <q-item v-for="item in favoritos.items" :key="item.id">
          <q-item-section>
            <q-item-label>{{ item.nombre }}</q-item-label>
            <q-item-label caption>{{ item.precio }} €</q-item-label>
          </q-item-section>
          <q-item-section side class="row no-wrap">
            <q-btn
              flat
              dense
              round
              icon="shopping_bag"
              color="primary"
              @click="carrito.agregar(item)"
              class="q-mr-xs"
            >
              <q-tooltip>Añadir a la bolsa</q-tooltip>
            </q-btn>
            <q-btn flat dense round icon="close" color="negative" @click="favoritos.toggle(item)">
              <q-tooltip>Quitar</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- MENÚ CARRITO -->
    <q-drawer v-model="menuCarrito" side="right" bordered>
      <div
        class="q-pa-md text-h6 text-primary text-center"
        style="border-bottom: 2px solid var(--q-secondary)"
      >
        Tu Bolsa
      </div>
      <q-list separator>
        <q-item v-if="carrito.items.length === 0">
          <q-item-section class="text-grey text-center q-pa-md">La bolsa está vacía</q-item-section>
        </q-item>
        <q-item v-for="item in carrito.items" :key="item.id">
          <q-item-section>
            <q-item-label>{{ item.nombre }}</q-item-label>
            <q-item-label caption>{{ item.cantidad }} x {{ item.precio }} €</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              dense
              round
              icon="delete"
              color="negative"
              @click="carrito.quitar(item.id)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="carrito.items.length > 0" class="q-pa-md">
        <div class="text-h6 text-right q-mb-md">Total: {{ carrito.total }} €</div>
        <q-btn color="primary" class="full-width" label="Tramitar Pedido" />
      </div>
    </q-drawer>

    <!-- DIÁLOGO BÚSQUEDA -->
    <q-dialog
      v-model="dialogBusqueda"
      position="right"
      maximized
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="bg-white text-dark" style="width: 450px; max-width: 100vw">
        <q-card-section class="row items-center q-pb-none q-pt-lg q-px-lg">
          <div class="text-subtitle1 text-weight-bold" style="letter-spacing: 1px">BÚSQUEDA</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup size="md" />
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-xl">
          <q-input
            v-model="textoBusqueda"
            placeholder="¿Qué estás buscando?"
            autofocus
            color="dark"
            @keyup.enter="ejecutarBusqueda(textoBusqueda)"
          >
            <template v-slot:append>
              <q-icon
                name="search"
                class="cursor-pointer"
                @click="ejecutarBusqueda(textoBusqueda)"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-px-lg q-pt-xl">
          <div class="text-h5 text-weight-regular q-mb-md text-grey-9">MÁS BUSCADOS</div>
          <q-list class="text-body1 text-grey-9">
            <q-item
              clickable
              v-ripple
              @click="ejecutarBusqueda('Alianzas')"
              class="q-py-sm q-px-none"
              ><q-item-section>Alianzas</q-item-section></q-item
            >
            <q-item
              clickable
              v-ripple
              @click="ejecutarBusqueda('Esclavas bebé')"
              class="q-py-sm q-px-none"
              ><q-item-section>Esclavas bebé</q-item-section></q-item
            >
            <q-item clickable v-ripple @click="ejecutarBusqueda('Reloj')" class="q-py-sm q-px-none"
              ><q-item-section>Reloj</q-item-section></q-item
            >
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container class="col grow column">
      <router-view class="col grow" :key="$route.fullPath" />
      <FooterJoyeria />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { carrito, favoritos } from '../store'
import FooterJoyeria from '../components/FooterJoyeria.vue'

const router = useRouter()
const menuIzquierdo = ref(false)
const menuCarrito = ref(false)
const menuFavoritos = ref(false)
const dialogBusqueda = ref(false)
const textoBusqueda = ref('')

function ejecutarBusqueda(termino) {
  dialogBusqueda.value = false
  textoBusqueda.value = ''
  router.push({ path: '/', query: { q: termino } })
}
</script>

<style>
.min-height-screen {
  min-height: 100vh;
}
.grow {
  flex-grow: 1;
}
.font-serif {
  font-family: 'Playfair Display', 'Times New Roman', serif;
}
.nav-link {
  color: #333 !important;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  border-radius: 4px;
}
.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
  color: var(--q-primary) !important;
}
.nav-active {
  color: var(--q-secondary) !important;
  font-weight: bold;
}
.icon-btn {
  transition: background-color 0.3s ease;
}
.icon-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
