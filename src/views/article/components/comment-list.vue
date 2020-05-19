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
      <!-- 评论 -->
      <comment-item
      :comment="comment"
       @reply-click="$emit('reply-click', $event)"
      />
      </van-cell>
     </van-list>
  </div>
</template>
<script>
import CommentItem from './comment-item'
import { getComments } from '@/api/comment'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [],
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
      this.$emit('total_count', data.data.total_count)
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
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
</style>
