<template>
  <div class='my-container'>
    <div class="user-info">
     <div class="user-base-info">
        <div class="user-wrap">
        <div class="user-wrap-title">
          <div class="avatar">
           <van-image
           class="avatar-img"
           round
           src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div class="user-name">昵称</div>
        </div>
      </div>
      <div class="compile-user">
        <van-button class="compile-user-btn" type="default" round size="small">编辑资料</van-button>
      </div>
     </div>
     <van-grid :border="false">
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
    <van-grid :column-num="2" class="icon-grid" >
    <van-grid-item  class="icon" icon-prefix="icon" icon="shoucang" text="收藏" />
    <van-grid-item class="icon" icon-prefix="icon" icon="lishi" text="历史" />
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
  background-image: url('./user-bg.png');
  background-size: cover;
  box-sizing: border-box;
  font-size: 16px;
  color: #fff;
  .user-base-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-wrap{
      .compile-user-btn{
        color: #666;
      }
    .user-wrap-title{
      display: flex;
      align-items: center;
      .avatar{
        width: 66px;
        height: 66px;
        margin-right: 10px;
        .avatar-img{
          width: 100%;
          height: 100%;
          border: 1px solid #fff;
        }
      }
      }

    }
  }
  .user-item{
    /deep/.van-grid-item__content{
      background-color: unset;
    }
  }

  }
  .icon-grid{
    .icon{
      height: 70px;
     /deep/ .icon-shoucang{
         color: #eb5253;
        font-size: 22px;
      }
      /deep/ .icon-lishi{
          color: #ff9d1d;
          font-size: 22px;
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
