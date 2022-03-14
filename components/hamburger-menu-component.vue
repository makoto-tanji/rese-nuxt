<template>
<div class="menu-container">
  <div class="menu-icon main-bg-color">
    <span class="menu__line--top"></span>
    <span class="menu__line--middle"></span>
    <span class="menu__line--bottom"></span>
  </div>
  <nav class="nav" id="nav">
    <ul>
      <li><a href="#" class="main-color">Home</a></li>
      <li><a href="#" class="main-color">Logout</a></li>
      <li><a href="#" class="main-color">Mypage</a></li>
    </ul>
  </nav>
</div>
</template>

<style scoped>
  .menu-container{
    position: relative;
  }
  .menu-icon{
    width:40px;
    height: 40px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px #505050;
    position: relative;
  }
  .menu__line--top,
  .menu__line--middle,
  .menu__line--bottom {
    display: inline-block;
    height: 2px;
    background-color: #fff;
    position: absolute;
    transition: 0.5s;
  }
  .menu__line--top {
    width: 40%;
    top: 20%;
    left: 20%;
  }
  .menu__line--middle {
    width: 60%;
    top: 50%;
    left: 20%
  }
  .menu__line--bottom {
    width: 20%;
    top: 80%;
    left: 20%;
  }
  .nav{
    width:300px;
    display:flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: -600px;
    transition: 0.8s;
  }
  .menu-icon:hover + .nav,
  .nav:hover{
    background-color: #fff;
    position: absolute;
    transform: translateX(200%);
  }
  .menu-icon:hover .menu__line--top,
  .nav:hover + .menu-icon .menu__line--top{
    width: 60%;
    top: 50%;
    transform: rotate(45deg);
  }
  .menu-icon:hover .menu__line--middle{
    opacity: 0;
  }
  .menu-icon:hover .menu__line--bottom{
    width: 60%;
    top: 50%;
    transform: rotate(-45deg);
  }
  ul{
    text-align: center;
  }
  li{
    padding: 20px;
  }
</style>
