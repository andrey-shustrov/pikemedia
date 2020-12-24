import Vue from 'vue'
import Router from 'vue-router'
import Catalog from './views/Catalog.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: Catalog,
        },
        {
            path: '/:id?',
            name: 'movie',
            component: () => import('./views/Movie.vue')
        }
    ]
})
