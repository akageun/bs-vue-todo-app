import Vue from 'vue'
import Router from 'vue-router'
import todoList from '@/components/todo/todoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: todoList
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
