<template>
  <footer
    class="bg-dark text-white q-pa-xl"
    style="border-top: 3px solid var(--q-secondary); margin-top: auto"
  >
    <div class="row q-col-gutter-lg justify-center max-width-container">
      <div class="col-12 col-md-3">
        <div class="text-h5 text-weight-bold text-secondary font-serif">Esmeraldia</div>
        <div class="text-subtitle2 q-mt-sm text-weight-bold">Tienda online de Joyería</div>
        <p class="text-caption text-grey-4 q-mt-md" style="line-height: 1.6">
          Con más de medio siglo marcando la diferencia en joyas y relojes. Elegancia y distinción
          en cada detalle.
        </p>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <div class="text-subtitle1 text-weight-bold q-mb-md">Información</div>
        <ul class="footer-links">
          <li><a href="#">Envíos y entregas</a></li>
          <li><a href="#">Devoluciones</a></li>
          <li><a href="#">Garantías</a></li>
          <li><a href="#">Formas de pago</a></li>
          <li><a href="#">Contacto</a></li>
          <li><a href="#">Tiendas</a></li>
        </ul>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <div class="text-subtitle1 text-weight-bold q-mb-md">Comunidad</div>
        <p class="text-caption text-grey-4">Encuéntranos en tu red social favorita</p>
        <div class="q-gutter-sm q-mt-sm">
          <q-btn flat round dense icon="fab fa-instagram" size="sm" class="text-white" />
          <q-btn flat round dense icon="fab fa-facebook" size="sm" class="text-white" />
          <q-btn flat round dense icon="fab fa-youtube" size="sm" class="text-white" />
          <q-btn flat round dense icon="fab fa-tiktok" size="sm" class="text-white" />
          <q-btn flat round dense icon="fas fa-envelope" size="sm" class="text-white" />
        </div>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <div class="text-subtitle1 text-weight-bold q-mb-md">Suscríbete a nuestra newsletter</div>
        <p class="text-caption text-grey-4">Mantente al día sobre el Mundo de la Joyería</p>

        <div
          class="row q-mt-sm"
          style="
            border: 1px solid #555;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
            overflow: hidden;
          "
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            class="col q-px-sm bg-transparent text-white no-border"
            style="outline: none; height: 40px"
          />
          <q-btn
            icon="arrow_forward"
            flat
            color="white"
            class="bg-black"
            style="height: 40px; border-radius: 0"
          />
        </div>

        <div class="q-mt-md">
          <q-checkbox
            dark
            v-model="privacy"
            label="He leído y acepto la política de privacidad."
            dense
            class="text-caption text-grey-4"
          />
        </div>
        <div class="q-mt-xs">
          <q-checkbox
            dark
            v-model="promo"
            label="Acepto suscribirme a la newsletter y recibir promociones."
            dense
            class="text-caption text-grey-4"
          />
        </div>
      </div>
    </div>

    <div
      class="row justify-between items-center q-mt-xl q-pt-md"
      style="border-top: 1px solid #333; max-width: 1200px; margin-0: auto"
    >
      <div class="row q-gutter-md text-caption text-grey-4">
        <span>Español</span>
        <span>EUR</span>
        <a href="#" class="text-grey-4 text-none">Aviso legal</a>
        <a href="#" class="text-grey-4 text-none">Política de privacidad</a>
        <a href="#" class="text-grey-4 text-none">Política de cookies</a>
        <a href="#" class="text-grey-4 text-none">Términos y condiciones</a>
      </div>
      <div class="row q-gutter-xs text-h6 text-grey-5">
        <q-icon name="fab fa-cc-visa" />
        <q-icon name="fab fa-cc-mastercard" />
        <q-icon name="fab fa-cc-paypal" />
        <q-icon name="fab fa-cc-apple-pay" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const privacy = ref(false)
const promo = ref(false)
</script>

<style scoped>
.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
}
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-links li {
  margin-bottom: 8px;
}
.footer-links a {
  color: #b0b0b0;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s;
}
.footer-links a:hover {
  color: var(--q-primary);
}
.font-serif {
  font-family: 'Playfair Display', 'Times New Roman', serif;
}
.text-none {
  text-decoration: none;
}
</style>
