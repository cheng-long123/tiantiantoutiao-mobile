<template>
  <div class='search-history'>
      <van-cell>
          <div slot="title">历史记录</div>
          <div v-if="isShowDelete">
              <span @click="$emit('update-histories', [])">全部删除</span>
              &nbsp;&nbsp;
              <span @click="isShowDelete = false">完成</span>
          </div>
          <van-icon v-else name="delete" @click="isShowDelete = true"/>
      </van-cell>
     <van-cell
     v-for="(historie, index ) in searchHistories"
     :key="index"
     :title="historie"
     @click="delHistories(historie, index)"
     >
         <van-icon
         name="close"
         v-show="isShowDelete"
         />
     </van-cell>
  </div>
</template>
<script>
import { delSearchHistories } from '@/api/search'
// import { setItem, remoItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    return {
      isShowDelete: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    async delHistories (historie, index) {
      if (this.isShowDelete) {
        if (this.user) {
          await delSearchHistories()
        }
        this.searchHistories.splice(index, 1)
        // setItem('search-history', this.searchHistories)
      } else {
        this.$emit('search', historie)
      }
    }
    // onSearch (historie) {
    //   this.$emit('search', historie)
    // },
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
</style>
