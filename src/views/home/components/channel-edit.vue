<template>
  <div class='channel-edit'>
      <van-cell center class="close-popup">
       <div
       slot="title"
       class="close"
       @click = "$emit('close')"
       >
         <van-icon name="cross" />
       </div>
         <div slot="label" class="compile">编辑频道</div>
      </van-cell>
     <van-cell
     center
     class="channel-title"
     :border="false"
     >
        <div
        class="title"
        slot="title"
        >
        我的频道
        <span>点击进入频道</span>
        </div>
        <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >
        {{isEdit ? '完成' : '编辑'}}
       </van-button>
    </van-cell>
     <van-grid :gutter="10">
       <van-grid-item
       :class="{active: active === index}"
       v-for="(userchannel, index) in userChannels"
       :key="index"
       :icon="(isEdit && index !== 0) ? 'close' : ''"
       :text="userchannel.name"
       @click="(index == 0 && isEdit ) ? '' :onUserChannelClick(userchannel, index)"
       />
     </van-grid>
      <van-cell
     center
     class="channel-title"
     :border="false"
     >
        <div class="title"
        slot="title"
        >
        推荐频道
        <span>点击添加频道</span>
        </div>
    </van-cell>
     <van-grid :gutter="10">
       <van-grid-item
       v-for="(channel, index) in recommendChannels"
       :key="index"
       :text="channel.name"
       @click="addChannel(channel)"
       />
     </van-grid>
  </div>
</template>
<script>
import { getAllchannels, addUserChannel, delUserChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      redirect: true
    },
    active: {
      type: Number,
      redirect: true
    }
  },
  components: {},
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  methods: {
    // 获取全部频道
    async getAllchannels () {
      const { data } = await getAllchannels()
      //   console.log(data)
      this.allChannels = data.data.channels
    },
    // 添加频道
    async addChannel (channel) {
      this.userChannels.push(channel)
      // 数据持久化
      if (this.user) {
        // 如果登录则添加用户的频道
        await addUserChannel({
          channels: [{
            id: channel.id,
            seq: this.userChannels.length
          }]
        })
      } else {
        // 如果没登录则存储本地
        setItem('user-channel', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
    // 判断是否为true 如果为true 则执行删除 为false则执行切换
      if (this.isEdit) {
      // 删除
        this.deleChennel(channel, index)
      } else {
      // 切换
        this.switchChannel(index)
      }
    },
    // 删除
    async deleChennel (channel, index) {
    // 如果删除的索引 小于 高亮的索引 重新传入索引减一
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      // 删除当前点击的索引对应的频道 删除数量为1
      this.userChannels.splice(index, 1)
      if (this.user) {
        // 如果登录则删除用户的频道
        await delUserChannels(channel.id)
      } else {
        // 如果没登录则存储本地
        setItem('user-channel', this.userChannels)
      }
    },
    // 切换
    switchChannel (index) {
    // 切换频道
      this.$emit('update-active', index)
      // 关闭弹层
      this.$emit('close')
    }
  },
  created () {
    this.getAllchannels()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
 .channel-edit{
     .close-popup{
         height: 55px;
         .close{
             float: left;
             font-size: 24px;
             color: #3296fa;
         }
         .compile{
             font-size: 18px;
            text-align: center;
            font-weight: 500px;
            color: #000;
         }
     }
    .channel-title{
        .title{
        font-size: 16px;
        color: #333333;
        span{
        font-size: 12px;
        color:#ccc;
          margin-left: 10px;
        }
        }
    }
   /deep/ .van-grid-item__content{
        position: relative;
         .van-grid-item__icon{
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 14px;
            color: #333;
              z-index: 10;
       }
       .van-grid-item__text{
           margin-top: 0;
       }
    }
    .van-grid{
       /deep/ .van-grid-item{
            width: 80px;
            height: 43px;
            font-size: 14px;
            color:#222222;
        }
    }
   .active{
    /deep/ .van-grid-item__text{
    color: red;
        }
    }
}
</style>
