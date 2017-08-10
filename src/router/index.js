import Vue from 'vue'
import Router from 'vue-router'
import TreemapComponent from '@/components/TreemapComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:level',
      name: 'Treemap',
      component: TreemapComponent,
      props: true
    }
  ]
})
