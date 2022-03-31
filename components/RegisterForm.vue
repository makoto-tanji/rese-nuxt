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
import { mdiAccount } from '@mdi/js'
import { mdiEmail } from '@mdi/js'
import { mdiLock } from '@mdi/js'

export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
      // v-form
      nameRules: [
        v => !!v || 'Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      // MDI
      iconAccount: mdiAccount,
      iconEmail: mdiEmail,
      iconLock: mdiLock
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
      } catch {
        alert("メールアドレスがすでに登録されています");
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