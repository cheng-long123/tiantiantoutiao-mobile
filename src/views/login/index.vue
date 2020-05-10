<template>
  <div class='login-container'>
     <van-nav-bar
        class="app-nav-bar"
        title="注册/登录"
        left-arrow
        @click-left="$router.back()"
     />
     <!-- 登录表单 -->
     <van-form
      :show-error="false"
      :show-error-message="false"
       @submit="onLogin"
        @failed="onFailed"

     >
        <van-field
            icon-prefix="icon"
            v-model="user.mobile"
            left-icon="shouji"
            placeholder="请输入手机号"
            name="mobile"
             :rules="formRules.mobile"
        />
        <van-field
            class="icon-yzm"
            icon-prefix="icon"
            v-model="user.code"
            clearable
            left-icon="yanzhengma"
            name="code"
            placeholder="请输入验证码"
          :rules="formRules.code"
        >
        <template #button>
        <van-button
        class="send-btn"
        size="small"
        round
        >发送验证码</van-button>
        </template>
        </van-field>
        <!-- 登录按钮 -->
          <div class="login-btn-wrap">
              <van-button
              class="login-btn"
              type="info"
              block
              >登录</van-button>
          </div>
         <!-- 登录按钮 -->
         </van-form>
     <!-- 登录表单 -->

  </div>
</template>
<script>
import { login } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单验证
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|4|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登陆中...', // 文本提示
        forbidClick: true, // 禁止背景点击
        duration: 0
      })
      try {
        await login(this.user)
        // console.log(res)
        // 成功
        Toast.success('登陆成功')
      } catch (err) {
        // 失败
        console.dir(err)
        if (err.response.request.status === 400) {
          Toast.fail('登陆失败,手机号或验证码错误')
        }
      }
    },
    onFailed (error) {
      // console.dir(error)
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    }
  },
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
    .van-cell-group{
      .icon-yzm{
        .van-field__left-icon{
            margin-top:10px ;
        }
      }

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
