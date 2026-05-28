// src/router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'admin', component: () => import('pages/AdminPage.vue') },
      { path: 'esmeraldas', component: () => import('pages/EsmeraldaInfoPage.vue') }, // <-- Aquí está tu nueva página
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]
export default routes
