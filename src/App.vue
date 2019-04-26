<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang='ts'>
import Vue from "Vue";
import Component from "vue-class-component";
declare let Mock:any;
@Component({})
export default class App extends Vue {
  mounted() {
    // console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV !== 'development') {
      document.oncontextmenu = function() {
        return false;
      };
      document.onkeydown = function(event) {
        if (event && event.keyCode == 123) {
          event.returnValue = false;
          return false;
        }
      };
    }
   
  }
}
</script>
<style lang='scss'>
@import "@/assets/css/index.scss";
</style>