<template>
  <v-form
    @submit.prevent="register"
    class="form-container"
  >
    <div class="input-container">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Username"
        placeholder="Username"
        required
        dense
        prepend-icon="mdi-account"
      />
      <div
        v-for="error in errorMessages.name"
        :key="error"
        class="error-container"
      >
        <p class="error-text">{{ error }}</p>
      </div>
    </div>
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
      <div
        v-for="error in errorMessages.email"
        :key="error"
        class="error-container"
      >
        <p class="error-text">{{ error }}</p>
      </div>
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
      <div
        v-for="error in errorMessages.password"
        :key="error"
        class="error-container"
      >
        <p class="error-text">{{ error }}</p>
      </div>
    </div>
    <button class="btn main-bg-color">登録</button>
  </v-form>
</template>

<script>

export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
      errorMessages: "",
      // v-form
      nameRules: [
        v => !!v || 'お名前を入力してください',
      ],
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+/.test(v) || 'メール形式で入力してください',
      ],
      passwordRules: [
        v => !!v || 'パスワードを入力してください',
      ],
    };
  }, // end data
  methods:{
    async register() {
      try {
        await this.$axios.post(`${this.$axios.defaults.baseURL}auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/thanks");
      } catch(error) {
        this.errorMessages = error.response.data.error;
        // 以下エラー内容確認用
        // console.log(error.response);
        // console.log(JSON.stringify(error));
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
input{
  width: 80%;
  line-height: 20px;
  border: none;
  border-bottom: 1px solid #000;
}
.error-text{
  color: red;
}
.btn{
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin: 15px 0px 0px auto;
  cursor: pointer;
}
</style>