import Vue from 'vue'
import Router from 'vue-router'
import Train from '@/components/Train'
import Index from '@/components/Index'
import whoIS from '@/components/whoIs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/quien-es',
      name: 'whoIs',
      component: whoIS
    },
    {
      path: '/train',
      name: 'train',
      component: Train
    }
  ]
})
