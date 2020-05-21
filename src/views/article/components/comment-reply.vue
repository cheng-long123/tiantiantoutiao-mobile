<template>
  <div class='comment-reply'>
        <!-- 头部 -->
      <van-nav-bar class="nav-bar" :title="`${comment.reply_count}条回复`">
        <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
        />
      </van-nav-bar>
      <!-- 评论 -->
     <comment-item :comment="comment">
     </comment-item>
     <!-- <van-cell title="全部评论" /> -->
    <!-- 评论的回复 -->
     <comment-list
     :source="comment.com_id"
     type="c"
     :list="replyComment"
     >
     </comment-list>
     <!-- 写评论 -->
       <div class="article-bottom">
        <van-button
        class="btn"
        round size="small"
        @click="isReplyShow = true"
        >
        回复评论
        </van-button>
    </div>
      <van-popup
        class="popup"
        v-model="isReplyShow"
        position="bottom"
        >
        <post-comment
        :target="comment.com_id"
        :articleId="articleId"
        @post-success="onReplyComment"
        />
    </van-popup>
  </div>
</template>
<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  data () {
    return {
      isReplyShow: false, // 回复评论弹出
      replyComment: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    onReplyComment (comment) {
      this.replyComment.unshift(comment)
      this.comment.reply_count++
      this.isReplyShow = false
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
  .nav-bar{
position: fixed;
    top: 21px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow-y: auto;
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
        width: 100%;
        font-size: 15px;
        color: #a7a7a7;
    }
}
</style>
