import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: HelloWorld
    }
  ]
})
