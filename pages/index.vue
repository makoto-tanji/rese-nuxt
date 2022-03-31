<template>
  <v-app>
    <div class="header-container">
      <HeaderComponent />
      <div class="search-container">
        <form action="">
          <input type="text" placeholder="All area" />
          <span class="partition" />
          <input type="text" placeholder="All genre" />
          <span class="partition" />
          <v-icon>{{iconMagnify}}</v-icon>
          <input type="text" placeholder="Search ..." />
        </form>
      </div>
    </div>
    <div class="main-container">
      <div
        v-for="shop in shopLists"
        :key="shop.id"
        class="shop-card"
      >
        <ShopCard :parentData=shop />
      </div>
    </div>
  </v-app>
</template>

<script>
import { mdiMagnify } from '@mdi/js';
import { mdiHeart } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';

export default {
  data() {
    return {
      shopLists: "",
      categoryLists: "",
      // MDI
      iconMagnify: mdiMagnify,
      iconHeart: mdiHeart,
      iconHeartOutline: mdiHeartOutline,
    }
  }, // end data
  methods: {
    // ページ読み込み時に呼ばれる
    // ショップデータを取得する関数
    async getShops() {
      const resData = await this.$axios.get(
        `${this.$axios.defaults.baseURL}shop`
      );
      this.shopLists = resData.data.data;
    },
  }, // end methods
  created() {
    this.getShops();
  }
}
</script>

<style scoped>
.theme--light.v-application {
    background: rgb(238, 238, 238);
    /* color: rgba(0, 0, 0, 0.87); */
}
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
  padding: 10px;
  /* border: none; */
  border-radius: 5px;
}
.partition{
  height: 20px;
  background-color: #505050;
  border: 1px solid #505050;
  margin: auto 0px;
}
.main-container{
  flex-wrap: wrap;
  justify-content: space-between;
}
.shop-card{
  width: 350px;
  /* height: 350px; */
  border-radius: 20px;
  background-color: #fff;
  margin-bottom: 50px;
  box-shadow: 5px 5px 3px #505050;
}
</style>
