import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import types from '@/components/types/types'
import detail from '@/components/bookDetail/bookDetail'
import reader from '@/components/reader/reader'

Vue.use(Router);

export default new Router({
    // mode: 'history',
    base: __dirname,
    linkActiveClass: 'active',
    routes: [
        {path: '/', redirect: '/home'},
        {
            path: '/home',
            component: home,
            meta: {
                keepAlive :true
            }
        },
        {
            path: '/types/:id',
            component: types,
            meta: {
                keepAlive :false
            }
        },
        {
            path: '/detail/:id',
            component: detail,
            meta: {
                keepAlive :false
            }
        },
        {
            path: '/reader/:id',
            component: reader,
            meta: {
                keepAlive :false
            }
        }
    ]
})
