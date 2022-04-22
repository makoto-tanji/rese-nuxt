import Vue from "vue";

export const state = () => ({
  favoriteShopList: [],
});

export const mutations = {
  // お気に入りの店を
  // favoriteShopList[shop.id] = true
  // という形で保存。それ以外はnullまたはfalse
  updateFavoriteShop(state, { index, boolean }) {
    Vue.set(state.favoriteShopList, index, boolean);
  },
  deleteFavoriteShop(state) {
    state.favoriteShopList = [];
  },
}