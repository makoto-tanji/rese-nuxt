<template>
  <div class="body-container">
    <div class="main-container">
      <div class="info-container">
        <HeaderComponent />
        <div class="content-name">
          <h2 class="shop-name">{{ shopData.name}}</h2>
        </div>
        <div class="content-img">
          <img :src="shopData.img_url" alt="" class="img">
        </div>
        <div class="content-tags">
          <p class="tags">#{{ shopData.area_id }}</p>
        </div>
        <div class="content-overview">
          <p>{{ shopData.overview }}</p>
        </div>
      </div>
      <div class="reservation-container main-bg-color"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopData: ""
    }
  }, // end data
  methods: {
    async getShop() {
      const resData = await this.$axios.get(
        'http://127.0.0.1:8000/api/shop/' + this.$route.params.id
      );
      this.shopData = resData.data.data[0];
    }
  }, // end methods
  created() {
    this.getShop();
  }
}
</script>

<style scoped>
.main-container{
  width: 100%;
  justify-content: space-between;
}
.search-container{
  display: none;
}
.info-container{
  width: 45%;
}
.shop-name{
  font-size: 28px;
  padding-bottom: 20px;
}
img{
  width: 100%;
  aspect-ratio: 16/9;
}
.content-overview{
  line-height: 20px;
}
.reservation-container{
  width: 45%;
  border-radius: 10px;
}
</style>
