<template>
  <div class='user-info'>
      <!-- 头部 -->
       <van-nav-bar
         title="个人信息"
         left-arrow
         @click-left="$router.back()"
        />
        <input
          type="file"
          name="file"
          ref="file"
          hidden
          accept="image/*"
          @change="onChange"
          >
        <van-cell is-link center @click="$refs.file.click()">
            <div slot="title"> 头像 </div>
            <van-image
              class="image"
               round
               fid="cover"
               :src="profile.photo"
               />
        </van-cell>
        <van-cell is-link center @click="isNameShow = true">
            <div slot="title"> 昵称 </div>
            <div>{{profile.name}}</div>
        </van-cell>
        <van-cell is-link center @click="isGenderShow = true">
            <div slot="title"> 性别 </div>
             <div>{{profile.gender === 0 ? '男' : '女'}}</div>
        </van-cell>
        <van-cell is-link center @click="isBirthdayShow = true">
            <div slot="title"> 生日 </div>
             <div>{{profile.birthday}}</div>
        </van-cell>
        <!-- 修改昵称 -->
         <van-popup
         class="popup-name"
         v-model="isNameShow"
         position="bottom"
         :style="{ height: '100%' }"
         >
         <update-name
            v-model="profile.name"
            @close="isNameShow = false"
         />
         </van-popup>
         <!-- 修改性别 -->
          <van-popup
            v-model="isGenderShow"
            position="bottom"
         >
         <update-gender
           @close = "isGenderShow = false"
           v-model="profile.gender"
         />
          </van-popup>
          <!-- 修改生日 -->
           <van-popup
            v-model="isBirthdayShow"
            position="bottom"
          >
          <update-birthday
           v-model="profile.birthday"
            @close="isBirthdayShow = false"
          />
           </van-popup>
           <!-- 修改头像 -->
             <van-popup
              v-model="isPhotoShow"
              position="bottom"
              :style="{ height: '100%' }"
              >
              <update-photo
               v-if="isPhotoShow"
              :file="file"
               @close="isPhotoShow = false"
               @update-photo="profile.photo = $event"
              />
             </van-popup>
  </div>
</template>
<script>
import { getUserpProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserInfo',
  props: {},
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      profile: {},
      isNameShow: false, // 昵称弹出层
      isGenderShow: false, // 性别弹出层
      isBirthdayShow: false, // 生日弹出层
      isPhotoShow: false, // 生日弹出层
      file: null // 上传图片
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getUserpProfile () {
      const { data } = await getUserpProfile()
      console.log(data)
      this.profile = data.data
    },
    onChange () {
      const file = this.$refs.file.files[0]
      this.file = file
      // console.log(file)
      this.isPhotoShow = true
      this.$refs.file.value = ''
    }
  },
  created () {
    this.getUserpProfile()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.user-info{
    background-color: #ededed;
}
.image{
  width: 30px;
  height: 30px;
}
.popup-name{
background-color: #F7F8FA;
}
</style>
