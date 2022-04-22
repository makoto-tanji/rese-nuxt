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
      // v-form
      nameRules: [
        // v => !!v || 'お名前を入力してください',
        (v) => {
          return (v) ? true : 'お名前を入力してください';
        }
      ],
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
    async register() {
      try {
        await this.$axios.post(`${this.$axios.defaults.baseURL}auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/thanks");
      } catch(error) {
        // alert((error.response.data.error.name || '')
        //   + (error.response.data.error.name && '\n')
        //   + (error.response.data.error.email || '')
        //   + (error.response.data.error.email && '\n')
        //   + (error.response.data.error.password || '')
        // );
        alert( ((error.response.data.error.name)? error.response.data.error.name + '\n' : '')
          + ((error.response.data.error.email)? error.response.data.error.email + '\n' : '')
          + ((error.response.data.error.password)? error.response.data.error.password + '\n' : '')
        );
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
.btn{
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin: 15px 0px 0px auto;
  cursor: pointer;
}
</style>