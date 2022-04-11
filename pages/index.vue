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
          <v-icon class="icon">{{iconMagnify}}</v-icon>
          <v-text-field
            type="text"
            v-model="nameSearchWord"
            placeholder="Search ..."
          />
        </form>
      </div>
    </div>
    <div class="main-container">
      <v-row >
        <v-col
          v-for="shop in searchLists"
          :key="shop.id"
          cols=12
          sm=6
          md=3
          class="shop-card"
        >
          <ShopCard :parentData=shop />
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import { mdiMagnify } from '@mdi/js';

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
.partition{
  height: 20px;
  background-color: #505050;
  border: 1px solid #505050;
  margin: auto 5px;
}
.main-container{
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.shop-card{
  width: 350px;
}

@media screen and (max-width: 768px) {
  .header-container{
    display: block;
  }
  form {
    flex-direction: column;
    margin-bottom: 40px;
  }
  .partition{
    display: none;
  }
  .icon{
    display: none;
  }
}
</style>
