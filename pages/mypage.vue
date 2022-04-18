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
            <button
              @click="isBeingEdited = !isBeingEdited"
              class="edit-btn btn"
            >
              <span v-if="isBeingEdited">やめる</span>
              <span v-if="!isBeingEdited">修正する</span>
            </button>
            <div v-if="isBeingEdited" class="edit-container">
              <v-form @submit.prevent="updateReservation(reservation.pivot.id)" class="reservation-form">
                <input
                  type="date"
                  v-model="reservationDate"
                  class="date-input"
                  required
                />
                <v-select
                  v-model="reservationTime"
                  :items="reservationTimeOption"
                  :rules="[v => !!v || '日時を選択してください']"
                  placeholder="10:00"
                  outlined
                  required
                  dense
                  background-color="white"
                />
                <v-select
                  v-model="reservationPeopleNumber"
                  :items="reservationPeopleNumberOption"
                  :rules="[v => !!v || '人数を選択してください']"
                  placeholder="1人"
                  outlined
                  required
                  dense
                  suffix="人"
                  background-color="white"
                />
                <button class="reservation-btn btn">変更する</button>
              </v-form>
            </div>
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
      // 予約情報編集用
      isBeingEdited: false,
      reservationDate: "",
      reservationTime: "10:00",
      reservationPeopleNumber: "",
      // 予約時間プルダウン用
      reservationTimeOption: this.$reservationTimeOption,
      // 予約人数プルダウン用
      reservationPeopleNumberOption: this.$reservationPeopleNumberOption,
      // MDI
      iconClock: mdiClock,
      iconCloseCircleOutline: mdiCloseCircleOutline,
      // ロード完了
      isLoading: true,
    };
  }, // end data

  methods: {
    // ページ読み込み時に呼ばれる。ユーザーデータを取得する関数
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
    //予約情報を削除する関数
    async deleteReservation(id){
      await this.$axios.delete(`${this.$axios.defaults.baseURL}auth/reservation/` + id);
      this.getUser();
    },
    // 予約情報を変更する関数
    async updateReservation(id) {
      if(this.reservationPeopleNumber && this.reservationDate && this.reservationTime){
        const sendData = {
          number_of_people: this.reservationPeopleNumber,
          reservation_date: this.reservationDate + ' ' + this.reservationTime,
        };
        await this.$axios.put(`${this.$axios.defaults.baseURL}auth/reservation/` + id, sendData);
        location.reload()
      }
    },
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
.btn{
  padding: 10px 15px;
  border-radius: 5px;
  margin: 15px 0px 0px auto;
  color: rgb(53, 96, 246);
  background-color: #fff;
}
.edit-container{
  background-color: rgb(85, 128, 247);
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
}
input{
  background-color: #fff;
  margin-bottom: 10px;
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
