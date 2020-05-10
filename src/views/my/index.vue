<template>
  <div class='my-container'>
    <div class="user-info">
     <div class="user-base-info">
        <div class="user-wrap">
        <div class="user-wrap-title">
          <div class="avatar">
           <van-image
           width="60"
           height="60"
           round
           src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div class="user-name">昵称</div>
        </div>
      </div>
      <div class="compile-user">
        <van-button type="default" round size="small">编辑资料</van-button>
      </div>
     </div>
     <van-grid>
      <van-grid-item class="user-item">
        <div class="span">8</div>
        <div class="text">头条</div>
      </van-grid-item>
      <van-grid-item class="user-item">
        <div class="span">8</div>
        <div class="text">关注</div>
      </van-grid-item>
      <van-grid-item class="user-item">
        <div class="span">8</div>
        <div class="text">粉丝</div>
      </van-grid-item>
      <van-grid-item class="user-item">
        <div class="span">8</div>
        <div class="text">获赞</div>
      </van-grid-item>
    </van-grid>
    </div>
    <van-grid :column-num="2" >
    <van-grid-item  class="shoucang" icon-prefix="icon" icon="shoucang" text="收藏" />
    <van-grid-item class="lishi" icon-prefix="icon" icon="lishi" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to=""/>
    <van-cell title="小智同学" is-link to=""/>
    <van-cell class="dropout" title="退出登录"  to="">
      <!-- <span>退出登录</span> -->
    </van-cell>
   </div>
</template>
<script>
export default {
  name: 'MyIndex',
  props: {},
  components: {},
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
.user-info{
  height: 180px;
  padding: 40px 16px;
  background-image: url(./user-bg.png) ;
  background-size: cover;
  box-sizing: border-box;
  font-size: 16px;
  .user-base-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-wrap{
    .user-wrap-title{
      display: flex;
      align-items: center;
      .avatar{
        margin-right: 10px;
      }
      }

    }
  }

  }

  .van-cell{
    margin-top: 10px;
  }
   .dropout{
   text-align: center;
   color:#d86262;

  }
</style>
