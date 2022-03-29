<template>
  <v-main>
    <img :src="parentData.img_url" alt="" class="card-img">
    <div class="info-container">
      <h2 class="shop-name">{{ parentData.name }}</h2>
      <div class="tags-container">
        <p class="tags">#{{ parentData.area_id }}</p>
        <div
          v-for="category in parentData.category_shop"
          :key="category.id"
          class="category-container"
        >
          <p class="tags">#{{ category.category_name }}</p>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <NuxtLink :to="`/detail/${parentData.id}`">詳しくみる</NuxtLink>
      <v-icon
        v-show="$store.state.favoriteShopList[parentData.id]"
        @click="removeFavorite(parentData.id)"
        color="red"
        class="heart"
        title="いいね解除"
      >
        {{ iconHeart }}
      </v-icon>
      <v-icon
        v-show="!$store.state.favoriteShopList[parentData.id]"
        @click="addFavorite(parentData.id)"
        title="いいね"
      >
        {{ iconHeartOutline }}
      </v-icon>
    </div>
  </v-main>
</template>

<script>
import { mdiHeart } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';

export default {
  props:["parentData"],
  data() {
    return {
      // MDI
      iconHeart: mdiHeart,
      iconHeartOutline: mdiHeartOutline,
    }
  }, // end data
  methods: {
    // ハート枠をクリックした時に呼ばれる
    // お気に入りに追加する関数
    async addFavorite(shopId) {
      if( !this.$auth.loggedIn ){
        alert('ログイン後にお気に入りに追加できます');
      } else {
        const sendFavoriteData = {
          shop_id: shopId,
          user_id: this.$auth.user.id
        };
        await this.$axios.post("http://localhost:8000/api/auth/favorite", sendFavoriteData);

        this.$store.commit('updateFavoriteShop', {
          index: shopId,
          boolean: true
        });
      }
    },
    // ハート(塗りつぶし)をクリックした時に呼ばれる
    // お気に入りを解除する関数
    async removeFavorite(shopId) {
      const deleteFavoriteData = {
        shopId: shopId,
        userId: this.$auth.user.id
      };
      await this.$axios.post("http://localhost:8000/api/auth/favorite/destroy", deleteFavoriteData);
      this.$store.commit('updateFavoriteShop', {
        index: shopId,
        boolean: false
      })
    }
  }, // end methods
}
</script>

<style scoped>
v-main{
  width: 350px;
  height: 350px;
  border-radius: 20px;
  background-color: #fff;
  margin-bottom: 50px;
  box-shadow: 5px 5px 3px #505050;
}
.card-img{
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.info-container{
  padding: 20px 20px 0px 20px;
}
.tags-container{
  display: flex;
  flex-direction: row;
}
.btn-container{
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>