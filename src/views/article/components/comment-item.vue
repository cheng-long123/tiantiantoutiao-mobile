<template>
  <div class='comment-item'>
       <div slot="title" class="comment-title">
            <van-image
            class="avatar"
            slot="icon"
            fid="cover"
            round
            :src="comment.aut_photo"
            />
           <div class="title">
               <span class="name">{{comment.aut_name}}</span>
               <div class="like"  @click="onlikings(comment)">
                    <van-icon
                    :name="comment.is_liking ? 'good-job' : 'good-job-o '"
                    :color="comment.is_liking ?  'red' : '#777' "
                    />
                    <span>{{comment.like_count}}</span>
               </div>
           </div>
            <div class="content">{{comment.content}}</div>
            <div class="foter">
                <span class="time">{{comment.pubdate | relativeTime}}</span>
                <van-button
                class="reply"
                round
                size="mini"
                @click="$emit('reply-click', comment)"
                >
               {{comment.reply_count}} 回复
                </van-button>
            </div>
       </div>
  </div>
</template>
<script>
import { addLikings, delLikings } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    // 点赞
    async onlikings (comment) {
      if (comment.is_liking) {
        await delLikings(comment.com_id.toString())
        this.comment.like_count--
      } else {
        await addLikings(comment.com_id.toString())
        this.comment.like_count++
      }
      comment.is_liking = !comment.is_liking
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.comment-item {
    .avatar {
        float: left;
        width: 35px;
        height: 35px;
        margin-right: 13px;
    }
    .comment-title{
       .title{
            .name{
           font-size: 14px;
           color: #406599;
           font-weight: 700;
          }
          .like{
              font-size: 14px;
              float: right;
             display: flex;
             align-items: center;
            //  span{
            //      font-size: 14px;
            //  }
          }

       }
        .content{
            width: 282px;
            font-size: 16px;
            color: #222222;
            margin: 17px 0 17px 50px;
            word-wrap:break-word;
        }
        .foter{
            margin-left: 50px;
            .time{
                margin-right: 16px;
                font-size: 11px;
                color: #222222;
            }
            .btn{
                width: 38px;
                height: 24px;
                background-color: #f4f5f6;
            }
        }
    }
}
</style>
