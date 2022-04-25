<template>
  <v-app>
    <transition>
      <LoadingCircle v-if="isLoading" />
    </transition>
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
          <v-text-field
            type="text"
            v-model="nameSearchWord"
            placeholder="Search ..."
            prepend-icon="mdi-magnify"
          />
        </form>
      </div>
    </div>
    <div class="main-container">
      <v-row>
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
      // ロード完了
      isLoading: true,
    }
  }, // end data

  methods: {
    // ページ読み込み時に呼ばれる。ショップデータを取得する関数
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
      return this.shopLists?.filter((elem) => {
        return this.areaSearchWord === "全て"
          || this.areaSearchWord === ""
          || elem.area.area_name === this.areaSearchWord;
      })?.filter((elem) => {
        return this.categorySearchWord === "全て"
          || this.categorySearchWord === ""
          || elem.category_shop.find(element => element.category_name === this.categorySearchWord);
      })?.filter((elem) => {
        return this.nameSearchWord === ""
          || elem.name.indexOf(this.nameSearchWord) > -1;
      }) || [];
    }
  }, // end computed

  mounted() {
    // ページの読み込みが完了したら0.5秒後にロード円を非表示
    this.$nextTick(() => {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    })
  }
}
</script>

<style scoped>
.theme--light.v-application {
  background: rgb(238, 238, 238);
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
