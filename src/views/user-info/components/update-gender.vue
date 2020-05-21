<template>
  <div class='updata-gender'>
      <van-picker
        title="性别"
        show-toolbar
        :default-index="gender"
        :columns="columns"
         @cancel="$emit('close')"
        @confirm="onConfirm"
        @change="onChange"
     />
  </div>
</template>
<script>
import { updateUserpProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  components: {},
  data () {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    onChange (picker, value, index) {
      this.gender = index
      console.log(index)
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true
      })
      await updateUserpProfile({ gender: this.gender })
      this.$emit('close')
      this.$emit('input', this.gender)
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
