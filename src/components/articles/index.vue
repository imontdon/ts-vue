<template>
  <div class="new-articles">
    <div class="title f_l"><h4>最新文章</h4></div>
    <ul class="f_l">
      <li v-for="(article, index) in articleArr" :key="index">
        {{ article.title }}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
// import Mock from 'mock'
import { Vue, Component, Prop } from 'vue-property-decorator'
declare let Mock: any;
@Component({})
export default class NewArticles extends Vue {
  articleArr: Array<Object> = []
  mounted() {
    let article = {
      title: '@string(2, 10)',
      content: '@string(102, 1000)'
    }
    const test = Mock.mock({
      "data|1-10": [article]
    })
    this.articleArr = test.data
    // console.log(test.data)
  }
}
</script>

<style lang='scss'>
  @import '@/assets/css/components/articles.scss';
</style>
