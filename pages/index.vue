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
    },
    // ページ内検索時にcomputedから呼ばれる
    // エリア検索と一致する or 未入力　なら true
    searchArea(elem) {
      if( this.areaSearchWord === "全て" || this.areaSearchWord === "") {
        return true;
      } else if(elem.area.area_name === this.areaSearchWord) {
        return true;
      }
      return false;
    },
    // ページ内検索時にcomputedから呼ばれる
    // カテゴリー検索と一致する or 未入力 なら true
    searchCategory(elem){
      if( this.categorySearchWord === "全て" || this.categorySearchWord === "") {
        return true;
      } else {
        let categoryIsMatch = false;
        // カテゴリーは複数ある可能性がある為forEachで全件確認
        elem.category_shop.forEach( (element) => {
          if(element.category_name === this.categorySearchWord){
            categoryIsMatch = true;
          }
        });
        return categoryIsMatch;
      }
    },
    // ページ内検索時にcomputedから呼ばれる
    // 店名検索が店名に含まれる　or 未入力なら true
    searchName(elem){
      if(this.nameSearchWord === "") {
        return true;
      } else {
        return (elem.name.indexOf(this.nameSearchWord) > -1) ? true : false;
      }
    }
  }, // end methods
  created() {
    this.getShops();
  },
  computed:{
    // ページ内検索でマッチした店舗だけを配列searchListsに格納
    searchLists(){
      // getShop前に処理しようとして、
      // this.shopLists.filter is not a function　となるのを防ぐためのif文
      if(this.shopLists !== null){
        return this.shopLists.filter(this.searchArea)
          .filter(this.searchCategory)
          .filter(this.searchName);
      }
      return this.shopLists;
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
