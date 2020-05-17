<template>
  <div class='search-container'>
      <!-- 搜索栏 -->
      <form action="/">
      <van-search
       v-model="searchText"
       background="#3296fa"
       show-action
       placeholder="请输入搜索关键词"
       @search="onSearch"
       @cancel="$router.back()"
       @focus ="isResultShow = false"
      />
      </form>
      <!-- /搜索栏 -->

      <!-- 搜索结果 -->
      <search-result v-if="isResultShow" />
      <!-- /搜索结果 -->

      <!-- 联想建议 -->
      <search-suggest
      v-else-if="searchText"
      :search-text="searchText"
      />
      <!-- /联想建议 -->

      <!-- 历史记录 -->
      <search-history v-else/>
      <!-- /历史记录 -->

  </div>
</template>
<script>
import SearchSuggest from './components/search-suggest'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
export default {
  name: 'SearchIndex',
  props: {},
  components: {
    SearchSuggest,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '', // 输入的建议
      isResultShow: false // 搜索结果显示状态
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSearch (val) {
    //   this.$toast(val)
    // 展示搜索结果列表
      this.isResultShow = true
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.search-container{
    .van-search__action{
        color: #fff;
    }
}
</style>
