import Vue from 'vue'
import Router from 'vue-router'
import Read from '@/components/Read'
import Create from '@/components/Create'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Read',
      component: Read
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})