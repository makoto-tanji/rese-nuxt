<template>
  <div class="body-container">
    <HeaderComponent />
    <div class="main-container">
      <div class="card">
        <p>ご予約ありがとうございます</p>
        <NuxtLink to="/" class="btn main-bg-color">戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container{
  justify-content: center;
}
.card{
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 3px 3px 3px #505050;
}
p{
  font-size: 24px;
  font-weight: bold;
}
.btn{
  padding: 10px 15px;
  margin-top: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
