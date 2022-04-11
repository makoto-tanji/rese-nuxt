<template>
  <v-app>
    <!-- appプロパティが必要です -->
    <v-app-bar app>Header</v-app-bar>

    <v-main>
      <v-container>
        Hello World
      </v-container>
      <div class="purple darken-2 text-center">
        <span class="white--text">Lorem ipsum</span>
      </div>
      <div class="test">

    <div class="header-container">
      <HeaderComponent />
      <div class="search-container">
        <form action="">
          <v-select
            v-model="areaSearchWord"
            :items="areaSearchOption"
            placeholder="All area"
          />
          <span class="partition" />
          <v-select
            v-model="categorySearchWord"
            :items="categorySearchOption"
            placeholder="All category"
          />
          <span class="partition" />
          <v-icon>{{iconMagnify}}</v-icon>
          <input
            type="text"
            v-model="nameSearchWord"
            placeholder="Search ..."
          />
        </form>
      </div>
    </div>

      </div>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
        ],
      };
    },
    methods: {
      testLog() {
        console.log(process.env.apiURL);
        console.log(this.$reservationTimeOption);
      },
      validate () {
        // this.$refs.form.validate()
        console.log(process.env.apiURL);
      },
    }
  }
</script>

<style scoped>
.header-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
form{
  background-color: #fff;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #808080;
}
input{
  width: 200px;
  display: block;
  /* padding: 10px; */
  /* border: none; */
  border-radius: 5px;
}
.partition{
  height: 20px;
  background-color: #505050;
  border: 1px solid #505050;
  margin: auto 5px;
}
</style>