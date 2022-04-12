<template>
  <v-app>
    <transition>
      <LoadingCircle v-if="isLoading" />
    </transition>
    <HeaderComponent />
    <div class="main-container">
      <p v-if="$auth.loggedIn" class="user-name">{{ $auth.user.name }}さん</p>
      <div class="main-content">
        <div class="reservation-container">
          <p class="ttl">予約状況</p>
          <div
            v-for="(reservation, index) in userData.reservations"
            :key="reservation.id"
            class="reservation-content main-bg-color"
          >
          <div class="icons-container">
            <v-icon color="white" class="mr-10">{{ iconClock }}</v-icon>
            <p>予約{{ index + 1 }}</p>
            <v-icon
            @click="deleteReservation(reservation.pivot.id)"
            color="white"
            class="ml-auto mr-0"
            >
              {{ iconCloseCircleOutline }}
            </v-icon>
          </div>
          <table>
            <tr>
              <td>shop</td>
              <td>{{ reservation.name }}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{{ getReservationDate(reservation) }}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>{{ getReservationTime(reservation) }}</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>{{ reservation.pivot.number_of_people }}人</td>
            </tr>
          </table>
          </div>
        </div>
        <div class="favorite-container">
          <p class="ttl">お気に入り店舗</p>
          <div class="">
            <div
              v-for="shop in userData.favorites"
              :key="shop.id"
              class="shop-card"
            >
              <ShopCard :parentData=shop />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mdiClock } from '@mdi/js';
import { mdiCloseCircleOutline } from '@mdi/js';

export default {
  data() {
    return {
      userData: '',
      testList: [],
      // MDI
      iconClock: mdiClock,
      iconCloseCircleOutline: mdiCloseCircleOutline,
      // ロード完了
      isLoading: true,
    };
  }, // end data
  methods: {
    async getUser(){
      const userData = await this.$axios.get(
        `${this.$axios.defaults.baseURL}auth/user`
      );
      this.userData = userData.data;
    },
    // 日にち(半角スペース)時間で保存されている予約時間から日にちを取り出す関数
    getReservationDate(reservationData){
      return reservationData.pivot.reservation_date.split(' ')[0];
    },
    // 日にち(半角スペース)時間で保存されている予約時間から時間を取り出す関数
    getReservationTime(reservationData){
      return reservationData.pivot.reservation_date.split(' ')[1];
    },
    async deleteReservation(id){
      await this.$axios.delete(`${this.$axios.defaults.baseURL}auth/reservation/` + id);
      this.getUser();
    }
  }, // end methods
  created() {
    this.getUser();
  },
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
/* vuetify */
.theme--light.v-application {
    background: rgb(238, 238, 238);
    /* color: rgba(0, 0, 0, 0.87); */
}
.v-application p {
    margin-bottom: 0px;
}
.main-container{
  flex-direction: column;
  align-items: center;
}
.user-name{
  font-size: 26px;
  font-weight: bold;
}
.main-content{
  width: 100%;
  display: flex;
  flex-direction: row;
}
.reservation-container{
  width: 40%;
  margin-right: 80px;
}
.ttl{
  font-size: 22px;
  font-weight: bold;
  margin: 40px 0px;
}
.reservation-content{
  width: 100%;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px #505050;
  margin-top: 20px;
}
.icons-container{
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
td{
  width: 100px;
  padding: 5px 0px;
}
.favorite-container{
  width: 40%;
}
.shop-card{
  width: 350px;
  margin-bottom: 30px;
}

@media screen and (max-width: 768px) {
  .main-content{
    flex-direction: column;
  }
  .reservation-container,
  .favorite-container{
    width: 100%;
  }
}
</style>
