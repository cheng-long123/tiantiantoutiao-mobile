<template>
  <div class='comment-reply'>
      <!-- 头部 -->
      <van-nav-bar title="10条回复">
            <van-icon slot="left" name="cross" />
      </van-nav-bar>
    <comment-item :comment="comment"/>
  </div>
</template>
<script>
import CommentItem from './comment-item'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {}
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
