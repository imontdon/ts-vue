<template>
  <div class="nav">
    <div class="nav-bar">
      <div class="menu">
        <!-- <test></test> -->
        <ul class='posi-rlt'>
          <li v-for="(route, index) in routes" :key="index" :class=' route.path == activeIndex ? "active" : "normal"' @click="changeActive(route.path)">
            <dt v-if="route.canPull" class="posi-rlt">
              {{ route.name }}
              <span class="posi-abs child-pull" style="display: none;">
                <dl v-for="(child, i) in route.children" :key="i">
                  {{ child.name }}
                </dl>
              </span>
            </dt>
            <router-link :key="route.name" :to="route.path" v-else>
              <span >
                {{ route.name }}
              </span>
            </router-link>
          </li>
          <search class="menu-search posi-abs" @search='searchRes'></search> 
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
// import Test from '@/views/tsx.vue'
// import { CreateElement } from 'vue'
import Search from '@/components/input/search.vue'
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'


@Component({
  components: {
    Search
  }
})
export default class Nav extends Vue {
  @Prop({ default: [] })
  routes: Array<Object>
  activeIndex: string = '/'
  mounted() {
    this.activeIndex = this.$route.path
    console.log(this.activeIndex, this.routes)
  }
  changeActive(path) {
    this.activeIndex = path
  }
  searchRes() {
    console.log('sss')
  }
  @Watch('$route')
  private onRouteChange(newVal: Object, oldVal: Object) {
    console.log(newVal)
  }
}
</script>

<style lang='scss'>
@import '@/assets/css/layout/nav.scss';
</style>
