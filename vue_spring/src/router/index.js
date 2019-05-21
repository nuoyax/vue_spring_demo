import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import  edituser from  '@/components/edituser'
import  adduser from  '@/components/adduser'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/edituser',
      name: 'edituser',
      component: edituser
    },
    {
      path: '/adduser',

      component: adduser
    }
  ]
})
