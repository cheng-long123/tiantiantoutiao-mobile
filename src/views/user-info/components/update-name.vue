<template>

  <div class='update-name'>
      <van-nav-bar
         title="修改昵称"
         left-arrow
         left-text="返回"
         right-text="完成"
         @click-left="$emit('close')"
         @click-right="onUptateName"
        />
      <van-field
        v-model="message"
        rows="2"
        autosize
        border
        label="昵称"
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
     />
  </div>
</template>
<script>
import { updateUserpProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
    //   type: String,
      require: true
    }
  },
  components: {},
  data () {
    return {
      message: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onUptateName () {
      await updateUserpProfile({ name: this.message })
      //   console.log(data)
      this.$emit('close')
      this.$emit('input', this.message)
      this.$toast.success('保存成功')
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
</style>
