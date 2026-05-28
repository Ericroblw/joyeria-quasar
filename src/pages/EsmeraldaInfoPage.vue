<!-- src/pages/EsmeraldaInfoPage.vue -->
<template>
  <q-page class="bg-white">
    <!-- Cabecera Principal -->
    <div
      class="text-center q-py-xl bg-primary text-white"
      style="border-bottom: 3px solid var(--q-secondary)"
    >
      <h1 class="text-h3 text-weight-bold q-mb-sm font-serif q-mt-none">
        El Origen de Nuestra Esmeralda
      </h1>
      <p class="text-h6 text-weight-regular">
        Descubre por qué la esmeralda colombiana no tiene rival en el mundo.
      </p>
    </div>

    <!-- Sección 1: El proceso de obtención -->
    <div class="row q-col-gutter-xl q-pa-xl justify-center max-width-container">
      <div class="col-12 col-md-6">
        <h2 class="text-h4 text-primary text-weight-bold q-mb-md">El arte de la extracción</h2>
        <p class="text-body1 text-grey-8" style="line-height: 1.8">
          La obtención de una esmeralda de alta calidad es un proceso que requiere paciencia,
          precisión y un profundo respeto por la naturaleza. A diferencia de otras gemas, las
          esmeraldas se encuentran protegidas en vetas muy delicadas dentro de la roca madre.
        </p>
        <p class="text-body1 text-grey-8" style="line-height: 1.8">
          Nuestros expertos mineros utilizan técnicas tradicionales para extraer los cristales en
          bruto sin alterar su estructura. Una vez extraídas, cada piedra es lavada y evaluada
          minuciosamente a mano. Solo las piezas que demuestran una cristalización perfecta y un
          color excepcional pasan a la fase de tallado y pulido, garantizando que cada joya sea una
          obra de arte natural.
        </p>
      </div>
      <div class="col-12 col-md-6 flex flex-center">
        <!-- Cuadro decorativo que simula una joya si no hay foto -->
        <div
          class="bg-secondary flex flex-center shadow-4"
          style="
            width: 100%;
            height: 350px;
            border-radius: 12px;
            border: 4px solid var(--q-primary);
          "
        >
          <q-icon name="diamond" size="120px" color="white" />
        </div>
      </div>
    </div>

    <!-- Sección 2: ¿Por qué colombianas? -->
    <div
      class="q-py-xl bg-grey-1"
      style="border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0"
    >
      <div class="max-width-container q-mx-auto q-px-md text-center">
        <h2 class="text-h4 text-primary text-weight-bold q-mb-lg">
          ¿Por qué Esmeralda Colombiana?
        </h2>
        <p class="text-body1 text-grey-8 q-mx-auto" style="max-width: 800px; line-height: 1.8">
          En <strong>Esmeraldia</strong> trabajamos exclusivamente con gemas provenientes de
          Colombia. A nivel global, las esmeraldas colombianas son consideradas el estándar de oro
          en la alta joyería, reconocidas como
          <strong>las más finas, puras y codiciadas del planeta</strong>.
        </p>

        <div class="row q-col-gutter-lg q-mt-xl text-left">
          <!-- Tarjeta 1 -->
          <div class="col-12 col-md-4">
            <q-card class="full-height q-pa-lg text-center" flat bordered>
              <q-icon name="palette" size="60px" color="secondary" class="q-mb-md" />
              <h3 class="text-h6 text-primary text-weight-bold">Color Inigualable</h3>
              <p class="text-body2 text-grey-8 q-mt-sm" style="line-height: 1.6">
                Su tono verde profundo, cálido y vibrante, originado por la presencia exacta de
                cromo y vanadio, es sencillamente imposible de replicar o encontrar en gemas de
                otras regiones del mundo, como África o Brasil.
              </p>
            </q-card>
          </div>

          <!-- Tarjeta 2 -->
          <div class="col-12 col-md-4">
            <q-card class="full-height q-pa-lg text-center" flat bordered>
              <q-icon name="verified" size="60px" color="secondary" class="q-mb-md" />
              <h3 class="text-h6 text-primary text-weight-bold">Pureza y Brillo</h3>
              <p class="text-body2 text-grey-8 q-mt-sm" style="line-height: 1.6">
                Se caracterizan por poseer un nivel de cristalización superior. Tienen menos
                inclusiones (conocidas como "el jardín" de la esmeralda) que opaquen la piedra, lo
                que permite una transparencia que potencia su brillo natural al máximo.
              </p>
            </q-card>
          </div>

          <!-- Tarjeta 3 -->
          <div class="col-12 col-md-4">
            <q-card class="full-height q-pa-lg text-center" flat bordered>
              <q-icon name="history_edu" size="60px" color="secondary" class="q-mb-md" />
              <h3 class="text-h6 text-primary text-weight-bold">Legado Histórico</h3>
              <p class="text-body2 text-grey-8 q-mt-sm" style="line-height: 1.6">
                Desde las legendarias minas de Muzo y Chivor, estas piedras han adornado a la
                realeza durante siglos. Adquirir una esmeralda colombiana es llevar consigo una
                pieza de historia, prestigio absoluto y la máxima calidad del mercado.
              </p>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Llamada a la acción -->
    <div class="text-center q-py-xl">
      <h3 class="text-h5 text-weight-bold text-primary q-mb-lg">
        Descubre nuestra colección exclusiva
      </h3>
      <q-btn
        to="/"
        color="primary"
        text-color="white"
        label="Ver Catálogo de Joyas"
        size="lg"
        unelevated
        class="q-px-xl"
      />
    </div>
  </q-page>
</template>

<script setup>
// Página puramente informativa y de diseño. No requiere lógica de Vue por el momento.
</script>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', 'Times New Roman', serif;
}
.max-width-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
