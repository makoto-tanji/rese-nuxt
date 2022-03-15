<template>
<div class="menu-container">
  <button
    v-if="menuIsOpened"
    @click="closeMenu"
    class="btn main-bg-color"
  >
    <span class="menu-line opened-menu-line-top"></span>
    <span class="menu-line opened-menu-line-middle"></span>
    <span class="menu-line opened-menu-line-bottom"></span>
  </button>
  <button
    v-else
    @click="openMenu"
    class="btn main-bg-color"
  >
    <span class="menu-line closed-menu-line-top"></span>
    <span class="menu-line closed-menu-line-middle"></span>
    <span class="menu-line closed-menu-line-bottom"></span>
  </button>
  <transition>
    <div
      @click.self="closeMenu"
      v-show="menuIsOpened == true"
      class="menu-content"
    >
      <ul v-if="!$auth.loggedIn">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/register">Registration</NuxtLink></li>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
      </ul>
      <ul v-if="$auth.loggedIn">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/logout">logout</NuxtLink></li>
        <li><NuxtLink to="/mypage">Mypage</NuxtLink></li>
      </ul>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      menuIsOpened: false
    }
  }, // end data
  methods: {
    openMenu(){
      this.menuIsOpened = true;
    },
    closeMenu(){
      this.menuIsOpened = false;
    }
  }
}
</script>

<style scoped>
.menu-container{
  position: relative;
}
.btn{
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #505050;
  position: relative;
  cursor: pointer;
}
.menu-line{
  display: inline-block;
  height: 2px;
  background-color: #fff;
  position: absolute;
  transition: 0.5s;
}
.closed-menu-line-top {
  width: 40%;
  top: 20%;
  left: 20%;
}
.closed-menu-line-middle {
  width: 60%;
  top: 50%;
  left: 20%
}
.closed-menu-line-bottom {
  width: 20%;
  top: 80%;
  left: 20%;
}
.opened-menu-line-top {
  width: 50%;
  left: 10px;
  transform: rotate(45deg);
}
.opened-menu-line-middle {
  opacity: 0;
}
.opened-menu-line-bottom {
  width: 50%;
  left: 10px;
  transform: rotate(-45deg);
}
.menu-content{
  width: 80vw;
  display: flex;
  justify-content: center;
  background: #fff;
  position: absolute;
}
.menuIsOpened{
  background-color: red;
}
.v-enter, .v-leave-to{
  opacity: 0;
}
.v-enter-to, .v-leave{
  opacity: 1;
}
.v-enter-active, .v-leave-active{
  transition: opacity 0.5s;
}
</style>
