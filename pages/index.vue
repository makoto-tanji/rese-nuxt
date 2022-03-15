<template>
  <div class="body-container">
    <div class="header-container">
      <HeaderComponent />
      <div class="search-container">
        <p>検索form</p>
      </div>
    </div>
    <div class="main-container">
      <div
        v-for="item in shopLists"
        :key="item.id"
        class="shop-card"
      >
        <div class="content-img">
          <img :src="item.img_url" alt="" class="card-img">
        </div>
        <div class="content-info">
          <h2 class="shop-name">{{ item.name }}</h2>
          <div class="content-tags">
            <p class="tags">#{{ item.area.area_name}}</p>
            <div
              v-for="category in item.category_shop"
              :key="category.id"
              class="category-container"
            >
              <p class="tags">#{{ category.category_name }}</p>
            </div>
          </div>
        </div>
        <div class="content-btn">
          <NuxtLink :to="`/detail/${item.id}`">詳しくみる</NuxtLink>
        </div>
      </div>
    </div> <!-- end v-for -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopLists: "",
      categoryLists: "",
    }
  }, // end data
  methods: {
    async getShops() {
      const resData = await this.$axios.get(
        'http://127.0.0.1:8000/api/shop'
      );
      this.shopLists = resData.data.data;
    }
  }, // end methods
  created() {
    this.getShops();
  }
}
</script>

<style scoped>
.header-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-container{
  flex-wrap: wrap;
  justify-content: space-between;
}
.shop-card{
  width: 350px;
  height: 350px;
  border-radius: 20px;
  background-color: #fff;
  margin-bottom: 50px;
  box-shadow: 5px 5px 3px #000;
}
.content-img{
  width:100%;
  height: 50%;
  /* position: relative; */
}
.card-img{
  width:100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* position: absolute; */

}
.content-info{
  padding: 20px 20px 0px 20px;
}
.shop-name{
  font-size: 20px;
}
.content-btn{
  margin: 20px;
}
.btn{
  width: 100px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  border-radius: 5px;
}
</style>
