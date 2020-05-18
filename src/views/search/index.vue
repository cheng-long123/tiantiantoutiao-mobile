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
      <search-result
      v-if="isResultShow"
      :search-text="searchText"
      />
      <!-- /搜索结果 -->

      <!-- 联想建议 -->
      <search-suggest
      v-else-if="searchText"
      :search-text="searchText"
      @search = "onSearch"
      />
      <!-- /联想建议 -->

      <!-- 历史记录 -->
      <search-history
      v-else
     :search-histories="searchHistories"
      @search = "onSearch"
      @update-histories="searchHistories = $event"
      />
      <!-- /历史记录 -->

  </div>
</template>
<script>
import SearchSuggest from './components/search-suggest'
import SearchHistory from './components/search-history'
import { getSearchHistories } from '@/api/search'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'
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
      isResultShow: false, // 搜索结果显示状态
      searchHistories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('search-history', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
  },
  methods: {
    onSearch (searchText) {
    //   this.$toast(val)
      this.searchText = searchText
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(searchText)
      // 存储到本地
      // setItem('search-history', this.searchHistories)
      // 展示搜索结果列表
      this.isResultShow = true
    },
    async loadSearchHistories () {
      let searchHistories = getItem('search-history') || []
      if (this.user) {
        const { data } = await getSearchHistories()
        searchHistories = [...new Set(
          [...searchHistories, ...data.data.keywords]
        )]
      }
      this.searchHistories = searchHistories
      // console.log(searchHistories)
      // console.log(123)
    }
  },
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
