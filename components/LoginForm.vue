<template>
  <form @submit.prevent="login" class="form-container">
    <div class="input-container">
      <v-icon>{{ iconEmail }}</v-icon>
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      >
    </div>
    <div class="input-container">
      <v-icon>{{ iconLock }}</v-icon>
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      >
    </div>
    <button class="btn main-bg-color">ログイン</button>
  </form>
</template>

<script>
import { mdiEmail } from '@mdi/js'
import { mdiLock } from '@mdi/js'

export default {
  auth: false,
  data() {
    return {
      email: null,
      password: null,
      favoriteList: [],
      // MDI
      iconEmail: mdiEmail,
      iconLock: mdiLock
    };
  }, // end data
  methods:{
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });

        // お気に入り店をVuexで保存
        const userData = await this.$axios.get(
          'http://127.0.0.1:8000/api/auth/user'
        );
        this.favoriteList = userData.data.favorites;
        for(let i=0; i<this.favoriteList.length; i++){
          this.$store.commit('updateFavoriteShop', {
            index: this.favoriteList[i].id,
            boolean: true
          });
        }

        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
  } // end methods
}
</script>

<style scoped>
.form-container{
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.form-container > *{
  margin: 10px 0px;
}
.input-container{
  display: flex;
  justify-content: space-between;
  ;
}
input{
  width: 80%;
  line-height: 20px;
  border: none;
  border-bottom: 1px solid #000;
}
.btn{
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin: 15px 0px 0px auto;
  cursor: pointer;
}
</style>