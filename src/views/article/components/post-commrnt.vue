<template>
  <div class='post-comment'>
     <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论内容"
      show-word-limit
    />
    <van-button
    class="btn"
    size="small"
    @click="addComment"
    >发布</van-button>
  </div>
</template>
<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  components: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    async addComment () {
      const { data } = await addComment({
        target: this.target,
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      console.log(data)
      this.$emit('post-success', data.data.new_obj)
      this.message = ''
      this.$toast.success('发布成功')
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.post-comment{
    display: flex;
    align-items: center;
    .btn{
        padding: 10px;
    }
}
</style>
