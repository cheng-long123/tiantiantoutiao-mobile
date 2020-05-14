<template>
  <div class='article-list'>
      <van-pull-refresh
      v-model="pullToRefresh"
      :success-text="refreshText"
      :success-duration="1500"
      @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getArticles"
            >
            <article-item
             v-for="(article,index) in articles"
             :key="index"
             :article='article'
            />
          <!-- <van-cell
           v-for="(article,index) in articles"
             :key="index"
          :title="article.title"
          /> -->
        </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      redirect: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      loading: false, // 加载
      finished: false, // 没有数据显示
      timestamp: null, // 时间戳
      pullToRefresh: false, // 下拉刷新
      refreshText: '' // 刷新成功提示
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getArticles () {
      // 发送请求
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      // 把数据push给articles
      this.articles.push(...results)
      this.loading = false
      // 判断是否还有数据
      if (results.length) {
        this.timestamp = data.pre_timestamp
      } else {
        // 提示没更多数据
        this.finished = true
      }
      // console.log(data)
    },
    // 下拉刷新
    async onRefresh () {
      // 发送请求
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      // 刷新添加
      this.articles.unshift(...results)
      // 刷新成功提示
      this.$toast('刷新成功')
      // 刷新成功关闭
      this.pullToRefresh = false
      // 更新提示
      this.refreshText = `更新${results.length}调数据`
    }
  },
  created () {
    this.getArticles()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.article-list{
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
