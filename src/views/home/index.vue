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
             <div
             class="channelPopup"
             slot="nav-right"
             @click="isPopupShow = true"
             >
              <van-icon name="wap-nav" />
            </div>
        </van-tabs>
        <!-- tab 切换 -->
        <!-- 弹出层 -->
            <van-popup
            v-model="isPopupShow"
            position="bottom"
            closeable
            close-icon-position="top-left"
            get-container="body"
            :style="{ height: '100%' }"
            >
            <channel-edit
            :user-channels="channels"
            :active="active"
            @close="isPopupShow = false"
            @update-active="active = $event"
            />
            </van-popup>
  </div>
</template>
<script>
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getUserchannels } from '@/api/user'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  props: {},
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isPopupShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    async getUserchannels () {
      // 定一个变量，存储频道
      let channels = []
      if (this.user) {
        // 如果登录就获取用户的频道列表
        const { data } = await getUserchannels()
        channels = data.data.channels
      } else {
        // 如果没有登录 获取本地存储的频道 判断本地存储有没有
        const localChannels = getItem('user-channel')
        if (localChannels) {
          // 本地如果有就给channles赋值
          channels = localChannels
        } else {
          // 如果用户没登录 本地存储页没有就获取默认推荐的频道
          const { data } = await getUserchannels()
          channels = data.data.channels
        }
      }
      // 赋值给channels
      this.channels = channels
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
  .channelPopup{
    position: fixed;
    right: 0;
    width: 33px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: .9;
  }
}
</style>
