<script lang='tsx'>
import Vue, { CreateElement } from 'Vue'
import { Component, Emit } from 'vue-property-decorator'

@Component
export default class Search extends Vue {
  render(h: CreateElement) {
    return (
      <div class='search-btn' >
        <input type='text' placeholder='搜索...' on-keyup={e => e.keyCode === 13 ? this.emitSearch() : null } />
        <span class='posi-abs' on-click={this.emitSearch.bind(this)} ></span>
      </div>
    )
  }
  @Emit('search')
  emitSearch() {
  }
}
</script>

<style lang='scss'>
  .search-btn {
    height: 30px;
    width: 90px;
    border-radius: 20px;
    border: 1px solid #fff;
    margin-top: 10px;
    transition: width .5s, background .5s, border .5s;
    -moz-transition: width .5s, background .5s, border .5s;
    -webkit-transition: width .5s, background .5s, border .5s; 
    -o-transition: width .5s, background .5s, border .5s;
    input {
      margin: 2px 0 2px 10px;
      padding: 3px;
      width: 40px;
      float: left;
      height: 20px;
      background: rgba(255, 255, 255, 0);
      border: 0;
      outline: 0;
    }
    span {
      float: left;
      background: url('../../assets/img/svg/search.svg') no-repeat center;
      background-size: 100% 100%;
      width: 20px;
      height: 20px;
      margin: 5px 0 5px 4px;
      right: 10px;
    }
  }
  .search-btn:hover {
    width: 120px;
    background: #fff;
    border: 1px solid green;
    input {
      width: 70px;
    }
  }
</style>
