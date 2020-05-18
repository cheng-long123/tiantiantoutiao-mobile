<template>
         <van-cell
         class='article-item'
         :to="{
           name:'article',
           params: {
             articleId: article.art_id
           }
         }"
         >
          <div
          class="title van-multi-ellipsis--l3"
          slot="title">
          {{ article.title}}
          </div>
          <div slot="label">
              <div class="cover-wrap"   v-if="article.cover.type === 3">
                <div
                class="cover-item"
                v-for="(img, index) in article.cover.images"
                :key="index">
                  <van-image
                    :src="img"
                  />
                </div>
              </div>
             <div class="label-info-wrap">
                  <span>{{ article.aut_name }}</span>
                  <span>{{ article.comm_count }}评论</span>
                  <span>{{ article.pubdate  | relativeTime }}</span>
             </div>
          </div>
              <van-image
              slot="default"
              v-if="article.cover.type === 1"
              :src="article.cover.images[0]"
              />
         </van-cell>
</template>
<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      redirect: true
    }
  },
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
.article-item{
    border-bottom: 1px solid #edeff3;
    /deep/ .title{
    font-size: 16px;
    color: #3a3a3a;
     }
     .cover-wrap{
         display: flex;
        /deep/ .cover-item{
               flex: 1;
               width: 116px;
                height: 73px;
                 &:not(:last-child) {
                  padding-right: 4px;
      }
                .van-image{
                    height: 100%;
                }
            }
     }
     .label-info-wrap{
         margin-top: 35px;
         span{
             color: #b4b4b4;
             font-size: 12px;
             margin-right: 13px;
         }
     }
      /deep/ .van-cell__value{
           width: 116px;
            height: 73px;
          flex: unset;
             .van-image{
            width: 116px;
            height: 73px;
          }
     }
}
</style>
