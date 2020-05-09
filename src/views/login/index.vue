<template>
  <div class='login-container'>
     <van-nav-bar
        class="app-nav-bar"
        title="注册/登录"
        left-arrow
        @click-left="$router.back()"
     />
     <!-- 登录表单 -->
     <van-cell-group>
        <van-field
            icon-prefix="icon"
            v-model="user.mobile"
            left-icon="shouji"
            placeholder="请输入手机号"
        />
        <van-field
            class="icon-yzm"
            icon-prefix="icon"
            v-model="user.code"
            clearable
            left-icon="yanzhengma"
            placeholder="请输入验证码"
        >
        <template #button>
        <van-button
        class="send-btn"
        size="small"
        round
        >发送验证码</van-button>
        </template>
        </van-field>
     </van-cell-group>
     <!-- 登录表单 -->
    <div class="login-btn-wrap">
         <van-button class="login-btn" type="info" block>登录</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
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
.login-container{
    .send-btn{
        background-color: #ededed;
        color: #666666;
        font-size: 11px;
    }
}
.login-btn-wrap{
     padding: 26px 16px;
     .login-btn{
         color: #6db4fb;
         font-size:15px;
         color: #fff;
         background-color: #6db4fb;
         border: none;
     }

    }
</style>
