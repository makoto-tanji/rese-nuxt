<template>
  <form @submit.prevent="register" class="form-container">
    <div class="input-container">
      <img src="" alt="img">
      <input
        type="text"
        v-model="name"
        placeholder="Username"
        required
      >
    </div>
    <div class="input-container">
      <img src="" alt="img">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      >
    </div>
    <div class="input-container">
      <img src="" alt="img">
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      >
    </div>
    <button class="btn main-bg-color">登録</button>
  </form>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  }, // end data
  methods:{
    async register() {
      try {
        await this.$axios.post("http://localhost:8000/api/auth/register", {
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
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  margin: 15px 0px 0px auto;
  cursor: pointer;
}
</style>