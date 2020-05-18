<template>
  <div class='search-result'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
     <van-cell
     v-for="(article, index) in list"
     :key="index"
     :title="article.title"
     />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  computed: {},
  watch: {
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      const { results } = data.data
      this.list.push(...results)
      //   console.log(data)
      // 加载状态结束
      this.loading = false
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>
