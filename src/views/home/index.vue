<template>
  <div class='home-container'>
          <!-- 头部搜索 -->
            <van-nav-bar
              class="app-nav-bar"
          >
          <van-button
          class="search-btn"
          type="info"
          slot="title"
          icon="search"
          round
          >
          搜索
          </van-button>
            </van-nav-bar>
          <!-- 头部搜索 -->
          <!-- tab 切换 -->
          <van-tabs
          v-model="active"
          color="#3296fa"
          line-width="20px"
          line-height="4px"
          swipeable
          >
            <van-tab
            v-for="channel in channels"
            :title="channel.name"
            :key="channel.id"
            >
            <article-list :channel="channel"/>
            </van-tab>
        </van-tabs>
        <!-- tab 切换 -->
  </div>
</template>
<script>
import ArticleList from './components/article-list'
import { getUserchannels } from '@/api/user'
export default {
  name: 'HomeIndex',
  props: {},
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getUserchannels () {
      const { data } = await getUserchannels()
      console.log(data)
      this.channels = data.data.channels
    }
  },
  created () {
    this.getUserchannels()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.home-container{
  /deep/ .van-nav-bar__title{
    max-width: none;
  }
  .search-btn{
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    color: #fff;
    border: none;
    .van-icon-search{
      font-size: 16px;
      color: #fff;
    }
    .van-button__text{
      font-size: 14px;
    }
  }
}
</style>
