<template>
  <v-app>
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
    <div class="main-container">
      <div
        v-for="shop in searchLists"
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
      shopLists: null,
      categoryLists: "",
      areaSearchWord: "",
      categorySearchWord: "",
      nameSearchWord: "",
      areaSearchOption: this.$areaSearchOption,
      categorySearchOption: this.$categorySearchOption,
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
    }
  }, // end methods
  created() {
    this.getShops();
  },
  computed:{

    // ページ内検索でマッチした店舗だけを配列searchListsに格納
    searchLists(){
      // オプショナルチェーン ?.
      // ?.の左側が参照されnullかundefinedならundefinedが返される
      return this.shopLists?.filter(function(elem){
        return this === "全て"
          || this === ""
          || elem.area.area_name === this;
          }, this.areaSearchWord)
      ?.filter(function(elem){
        return this === "全て"
          || this === ""
          || elem.category_shop.find(element => element.category_name === this);
          }, this.categorySearchWord)
      ?.filter(function(elem){
        return this === "" || elem.name.indexOf(this) > -1;
        }, this.nameSearchWord)
      || [];
    }
  },
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
