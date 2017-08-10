import 'document-register-element/build/document-register-element'
import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
import TreemapComponent from './components/TreemapComponent'
import Promise from 'es6-promise'
/* eslint-disable no-unused-vars */
import router from './router'

Promise.polyfill()

Vue.config.productionTip = false
Vue.use(VueCustomElement)
Vue.customElement('dp-treemap', TreemapComponent)

