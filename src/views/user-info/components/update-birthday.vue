<template>
  <div class='update-birthday'>
     <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
         @cancel="$emit('close')"
         @confirm="onConfirm"
       />
  </div>
</template>
<script>
import { updateUserpProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onConfirm () {
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true
      })
      await updateUserpProfile({ birthday: date })
      this.$emit('close')
      this.$emit('input', date)
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
