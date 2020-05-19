<template>
  <div class='comment-list'>
      <van-cell title="全部评论"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="以展示所有评论"
        @load="onLoad"
        >
      <van-cell
      class="comment"
      center
      v-for="(comment, index) in list"
      :key="index"
      >
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
               <div class="like">
                    <van-icon
                    :name="comment.is_liking ? 'good-job' : 'good-job-o '"
                    :color="comment.is_liking ?  'red' : '#777' "
                    @click="onlikings(comment)"
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
                >
               {{comment.reply_count}}回复
                </van-button>
            </div>
       </div>
      </van-cell>
     </van-list>
  </div>
</template>
<script>
import { getComments } from '@/api/article'
import { addLikings, delLikings } from '@/api/user'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getComments({
        type: 'a',
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })
      const { results } = data.data
      this.list.push(...results)
      console.log(data)
      //   关闭loding'
      this.loading = false
      //   判断是否results里是否有数据
      if (results.length) {
        //   有数据 下一页
        this.offset = data.data.last_id
      } else {
        //   开启finished
        this.finished = true
      }
    },
    // 点赞
    async onlikings (comment) {
      if (comment.is_liking) {
        await delLikings(comment.com_id)
      } else {
        await addLikings(comment.com_id)
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
.comment {
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
              float: right;
             display: flex;
             align-items: center;
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
