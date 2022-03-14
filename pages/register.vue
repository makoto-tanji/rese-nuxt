<template>
  <div class="body-container">
    <HeaderComponent />
    <div class="main-container">
      <div class="card">
        <div class="ttl-container main-bg-color">Registration</div>
        <div class="form-container">
          <div class="input-container">
            <img src="" alt="img">
            <input type="text" placeholder="Username">
          </div>
          <div class="input-container">
            <img src="" alt="img">
            <input type="email" placeholder="Email">
          </div>
          <div class="input-container">
            <img src="" alt="img">
            <input type="password" placeholder="Password">
          </div>
          <button class="btn main-bg-color">登録</button>
        </div>
      </div>
    </div>
  </div>
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
.form-container{
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.form-container > *{
  margin: 15px 0px;
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