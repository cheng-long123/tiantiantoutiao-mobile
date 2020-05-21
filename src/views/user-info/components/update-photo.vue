<template>
  <div class='update-photo'>
      <van-nav-bar
        class="nav-bar"
        :border="false"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onClickRight"
     />
     <img class="image" :src="image" ref="image" alt="">
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { updateUserpPhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
    //   type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onClickRight () {
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      await updateUserpPhoto(fd)
      this.$emit('update-photo', window.URL.createObjectURL(file))
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  },
  created () {},
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.update-photo{
    height: 100%;
    background-color:rgba(0, 0, 0, .9);
}
.nav-bar{
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    // background-color:rgba(0, 0, 0, .9);
    background-color: unset;
    color: #fff;
    /deep/.van-nav-bar__text{
        color: #fff
    }
}
.image {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
