<template>
  <v-form
    @submit.prevent="login"
    class="form-container"
  >
    <div class="input-container">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        placeholder="Email"
        required
        dense
        prepend-icon="mdi-email"
      />
    </div>
    <div class="input-container">
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        placeholder="Password"
        required
        dense
        type="password"
        prepend-icon="mdi-lock"
      />
    </div>
    <button class="btn main-bg-color">ログイン</button>
  </v-form>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      email: null,
      password: null,
      favoriteList: [],
      // v-form
      emailRules: [
        (v) => {
          return (v) ? true : 'メールアドレスを入力してください';
        },
        (v) => {
          return ( /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/.test(v) )? true : 'メールアドレス形式で入力してください'
        },
      ],
      passwordRules: [
        (v) => {
          return (v) ? true : 'パスワードを入力してください';
        }
      ],
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
          `${this.$axios.defaults.baseURL}auth/user`
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