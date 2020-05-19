<template>
  <div class='article-container'>
    <van-nav-bar
        class="app-nav-bar"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
    />
        <!-- 标题 -->
    <div class="user-wrap">
        <h1 class="title">{{article.title}}</h1>
            <!-- 用户资料 -->
        <div class="user-info">
            <div class="left-info">
                <van-image
                class="user-avatar"
                :src="article.aut_photo"
                round
                fit="cover"
                />
                <div class="user-name">
                    <span class="name">{{article.aut_name}}</span>
                    <span class="time">{{article.pubdate | relativeTime}}</span>
                </div>
                </div>
                <van-button
                round
                size="small"
                :icon=" article.is_followed ? '' : 'plus' "
                :type="article.is_followed ? 'default' : 'info' "
                @click="onFollow"
                :disabled="isDisabledShow"
                >
                {{article.is_followed ? '已关注' : '关注'}}
                </van-button>
                    </div>
                    <!-- 内容 -->
                    <div
                    class="markdown-body"
                    v-html="article.content"
                    ref="article-content"
                    >
                    </div>
                    <!-- 结尾 -->
                    <van-divider>正文结束</van-divider>
                     <!-- 评论 -->
                       <comment-list
                       :source="articleId"
                       :list="commentList"
                       @total_count="totalCount = $event"
                       @reply-click="replyClick"
                       />
            </div>
              <!-- 底部区域 -->
              <div class="article-bottom">
                  <van-button
                  class="btn"
                  round size="small"
                  @click="isPostShow = true"
                  >
                  写评论</van-button>
                  <van-icon
                  name="chat-o"
                  :badge="totalCount"
                  color="#777777"
                  />
                  <van-icon
                  :name="article.is_collected ? 'star' : 'star-o '"
                   :color="article.is_collected ? 'orange' : '#777777'"
                   @click="onCollections"
                  />
                  <van-icon
                  :name="article.attitude === 1 ? 'good-job' : 'good-job-o' "
                   :color=" article.attitude === 1 ? 'red' : '#777777' "
                   @click="onLike"
                  />
                  <van-icon
                  name="share"
                   color="#777777"
                  />
              </div>
              <!-- 评论弹出层 -->
                  <van-popup
                  v-model="isPostShow"
                  position="bottom"
                  >
                   <post-comment
                   :target="articleId"
                   @post-success="postSuccess"
                   />
                  </van-popup>
                  <!-- 评论回复 -->
                  <van-popup
                  v-model="isReplyShow"
                  position="bottom"
                  >
                  <comment-reply
                   :comment="replyComment"
                  />
                  </van-popup>
     </div>
</template>
<script>
import './github-markdown.css'
import PostComment from './components/post-commrnt'
import {
  getArticle,
  addCollections,
  delCollections,
  addLike,
  delLike
} from '@/api/article'
import { addFollowed, delFollowed } from '@/api/user'
import { ImagePreview } from 'vant'
import CommentList from './components/comment-list'
import CommentReply from './components/comment-reply'

export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  data () {
    return {
      article: {}, // 文章详情数据
      isDisabledShow: false, // 是否禁用
      isPostShow: false, // 评论弹出层
      commentList: [],
      totalCount: 0, // 评论总数量
      isReplyShow: false, // 回复评论弹出层
      replyComment: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getArticle () {
      const { data } = await getArticle(this.articleId)
      // console.log(data)
      this.article = data.data
      this.$nextTick(() => {
        this.ImagePreview()
      })
    },
    ImagePreview () {
      // 获取文章内容中DOM元素
      const articleContent = this.$refs['article-content']
      //   获取内容中的img标签
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index,
            closeable: true
          })
        }
      })
      // console.log(imgs)
    },
    // 关注
    async onFollow () {
      // 开启禁用
      this.isDisabledShow = true
      //   判断是为true
      if (this.article.is_followed) {
        // 取消关注
        await delFollowed(this.article.aut_id)
      } else {
        // 添加关注
        await addFollowed(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      //   解除禁用
      this.isDisabledShow = false
    },
    // 收藏
    async onCollections () {
      if (this.article.is_collected) {
        //   取消收藏
        await delCollections(this.articleId)
      } else {
        //   收藏
        await addCollections(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast({
        message: `${this.article.is_collected ? '收藏成功' : '取消收藏'}`
      })
    },
    // 点赞
    async onLike () {
      if (this.article.attitude === 1) {
        //  取消点赞
        await delLike(this.articleId)
        this.article.attitude = -1
      } else {
        //   点赞
        await addLike(this.articleId)
        this.article.attitude = 1
      }
    },
    postSuccess (comment) {
      // console.log(comment)

      this.commentList.unshift(comment)
      this.totalCount++
      this.isPostShow = false
    },
    replyClick (comment) {
      // console.log(comment)
      this.replyComment = comment
      this.isReplyShow = true
    }
  },
  created () {
    this.getArticle()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.user-wrap{
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
}
.title{
    font-size: 20px;
    color: #3a3a3a;
    padding: 15px;
    font-weight: 700;
    background-color: #fff;
    margin: 0;
}
.user-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
     background-color: #fff;
    .left-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-avatar{
        width: 35px;
        height: 35px;
        margin-right: 9px;
    }
    .user-name{
     display: flex;
     flex-direction: column;
     align-items: center;
           .name{
            font-size: 12px;
            margin-bottom: 4px;
            color: #000;
          }
          .time{
            font-size: 12px;
            color: #ccc;
          }
       }
    }
}
.markdown-body{
    padding: 15px;
    background-color: #fff;
}
.article-bottom{
    z-index: 10;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 44px;
    // z-index: 10;
    display: flex;
    justify-content: space-around;
    align-items: center;
     box-sizing: border-box;
    background-color: #fff;
    .btn{
        width: 141px;
        font-size: 15px;
        color: #a7a7a7;
    }
}
</style>
