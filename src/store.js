// src/store.js
import { reactive } from 'vue'

export const carrito = reactive({
  items: [],
  agregar(joya) {
    const existe = this.items.find((i) => i.id === joya.id)
    if (existe) {
      existe.cantidad++
    } else {
      this.items.push({ ...joya, cantidad: 1 })
    }
  },
  quitar(id) {
    this.items = this.items.filter((i) => i.id !== id)
  },
  get total() {
    return this.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
  },
})

// NUEVO: Sistema de favoritos
export const favoritos = reactive({
  items: [],
  toggle(joya) {
    const index = this.items.findIndex((i) => i.id === joya.id)
    if (index > -1) {
      this.items.splice(index, 1) // Si ya está, lo quita
    } else {
      this.items.push(joya) // Si no está, lo añade
    }
  },
  esFavorito(id) {
    // Comprueba si la joya ya está en la lista para pintar el corazón de rojo
    return this.items.some((i) => i.id === id)
  },
})
