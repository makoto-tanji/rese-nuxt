<template>
  <v-app>
    <HeaderComponent />
    <div class="main-container">
      <div class="card">
        <div class="ttl-container main-bg-color">Registration</div>
        <RegisterForm />
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.main-container{
  justify-content: center;
}
.card{
  width: 350px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 3px 3px 3px #505050;
}
.ttl-container{
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.theme--light.v-application {
  background: rgb(238, 238, 238);
}
</style>
