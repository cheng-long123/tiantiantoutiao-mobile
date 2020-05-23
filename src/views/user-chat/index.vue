<template>
  <div class='chat-container'>
     <van-nav-bar
        class="app-nav-bar"
        title="小智同学"
        left-arrow
        @click-left="$router.back()"
     />
       <div class="message-list" ref="message-list">
      <div
        class="message-item"
        v-for="(item, index) in messages"
        :key="index"
      >
        <van-image
          class="avatar"
          round
          fit="cover"
          src="http://toutiao.meiduo.site/FqHn7ps9v5I8esWXJNKH0asrSwcB"
        />
        <div class="msg-wrap" style="flex: 1;">
          <div class="title">{{ item.msg }}</div>
        </div>
      </div>
    </div>
     <van-cell-group class="group">
       <van-field v-model="message" placeholder="请输入消息" />
       <van-button size="small" type="info" @click="onSnde">发送</van-button>
     </van-cell-group>
  </div>
</template>
<script>
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'ChatIndex',
  props: {},
  components: {},
  data () {
    return {
      message: '',
      socket: null,
      messages: getItem('chat-msg') || []
    }
  },
  computed: {},
  watch: {
    messages () {
      setItem('chat-msg', this.messages)
      this.scrollTop()
    }
  },
  methods: {
    onSnde () {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      this.messages.push(data)
      this.message = ''
    },
    scrollTop () {
      const list = this.$refs['message-list']
      this.$nextTick(() => {
        list.scrollTop = list.scrollHeight
      })
    }
  },
  created () {
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    socket.on('connect', () => {
      console.log('建立连接成功')
    })
    // socket.on('event', function (data) {})
    socket.on('disconnect', () => {
      console.log('断开连接')
    })
    window.socket = socket
    socket.on('message', data => {
      this.messages.push(data)
    })
  },
  mounted () {
    this.scrollTop()
  },
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.chat-container {
  position: absolute;
  width: 100%;
  height: 100%;
  // padding: 46px 0 50px 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #f5f5f6;
  .message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    height: 100%;
    overflow-y: scroll;
    .message-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      padding: 10px;
      .msg-wrap {
        word-break: break-all;
        word-wrap: break-word;
      }
      .title {
        display: table;
        background: #e0effb;
        border-radius: 6px;
        font-size: 14px;
        padding: 10px 10px;
        margin-right: 45px;
      }
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
    }
    .reverse {
      flex-direction: row-reverse;
      .msg-wrap {
        display: flex;
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
          margin-left: 45px;
        }
      }
    }
  }
  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
.group{
  position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  display: flex;
  align-items: center;
}
</style>
