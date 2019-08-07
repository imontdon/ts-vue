import Vue from 'vue';
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import setState from './utils/setState'
import MESSAGE from './components/message/message'
declare module "*.vue" {
  // import Vue from "vue";
  export default Vue;
}
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter,
    $route: Route,
    $setState: setState,
    $message: MESSAGE
    // Mock:any
  }
}
declare var window: any
declare var document: Document
// declare var Option: Option
declare global {
  interface StarObject {
    x?: number,
    y?: number,
    r?: number
  }
}
// declare let Mock:any;
/* interface Option {
  value: string,
  label: string
} */
