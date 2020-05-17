<template>
  <div class='search-history'>
      <van-cell>
          <div slot="title">历史记录</div>
          <div v-if="isShowDelete">
              <span>全部删除</span>
              &nbsp;&nbsp;
              <span @click="isShowDelete = false">完成</span>
          </div>
          <van-icon v-else name="delete" @click="isShowDelete = true"/>
      </van-cell>
     <van-cell>
         <div slot="title">Nihao </div>
         <van-icon name="close" v-if="isShowDelete"/>
     </van-cell>
  </div>
</template>
<script>
export default {
  name: 'SearchHistory',
  props: {},
  components: {},
  data () {
    return {
      isShowDelete: false
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
</style>
