<template>
  <div class='search-suggest'>
      <van-cell
      v-for="(str, index) in suggest"
      :key="index"
      icon="search"
      :title="str">
      </van-cell>
  </div>
</template>
<script>
import { getAssociateSuggest } from '@/api/search'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      suggest: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getAssociateSuggest(this.searchText)
        // console.log(data)
        this.suggest = data.data.options
      }, 300),
      immediate: true
    }
  },
  methods: {},
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
</style>
