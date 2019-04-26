<template>
  <div class="app-main">
    <transition name="fade">
      <router-view :key='$route.name + new Date()'></router-view>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class AppMain extends Vue{
  
}
</script>

<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
</style>
