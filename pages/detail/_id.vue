<template>
  <v-app>
    <transition>
      <LoadingCircle v-if="isLoading" />
    </transition>
    <div class="main-container">
      <div class="info-container">
        <HeaderComponent />
        <div class="content-name">
          <v-icon @click="$router.back()" class="icon chevron-left">{{ chevronLeft }}</v-icon>
          <h2 class="shop-name">{{ shopData.name}}</h2>
        </div>
        <div class="content-img">
          <img :src="shopData.img_url" alt="" class="img" />
        </div>
        <div class="content-tags">
          <p class="tags">#{{ areaName }}</p>
          <div
            v-for="category in shopData.category_shop"
            :key="category.id"
            class="category-container"
          >
            <p class="tags">#{{ category.category_name }}</p>
          </div>
        </div>
        <div class="content-overview">
          <p>{{ shopData.overview }}</p>
        </div>
      </div>
      <div class="reservation-container main-bg-color">
        <p class="ttl">予約</p>
        <div v-if="$auth.loggedIn" class="reservation-content">
          <v-form @submit.prevent="reserve" class="reservation-form">
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
            <div class="confirmation-container">
              <table>
                <tr>
                  <td>shop</td>
                  <td>{{ shopData.name }}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{{ reservationDate }}</td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td>{{ reservationTime }}</td>
                </tr>
                <tr>
                  <td>Number</td>
                  <td>{{ reservationPeopleNumber }}人</td>
                </tr>
              </table>
            </div>
            <button class="reservation-btn">予約する</button>
          </v-form>
        </div>
        <div v-if="!$auth.loggedIn" class="recommending-container">
          <p>初めての方・会員登録されていない方</p>
          <RegisterForm />
          <p>すでに会員登録がお済みの方</p>
          <LoginForm />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mdiChevronLeft } from '@mdi/js';

export default {
  data() {
    return {
      // 表示用
      shopData: "",
      areaName: "",
      errorMessage: "",
      // 予約データ送信用
      reservationDate: "",
      reservationTime: "10:00",
      reservationPeopleNumber: "",
      // ロード完了
      isLoading: true,
      // 予約時間プルダウン用
      reservationTimeOption: this.$reservationTimeOption,
      // 予約人数プルダウン用
      reservationPeopleNumberOption: this.$reservationPeopleNumberOption,
      // MDI
      chevronLeft: mdiChevronLeft,
    }
  }, // end data

  methods: {
    // 本日の日付を取得する関数
    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const date = currentDate.getDate();
      this.reservationDate = year + "-" + month + "-" + date;
    },
    // 店舗情報を取得する関数
    async getShop() {
      const resData = await this.$axios.get(
        `${this.$axios.defaults.baseURL}shop/` + this.$route.params.id
      );
      this.shopData = resData.data.data[0];
      this.areaName = resData.data.data[0].area.area_name;
    },
    // 予約情報をDBに保存する関数
    async reserve() {
      try {
        const sendData = {
          shop_id: this.shopData.id,
          user_id: this.$auth.user.id,
          number_of_people: this.reservationPeopleNumber,
          reservation_date: this.reservationDate + ' ' + this.reservationTime,
        };
        await this.$axios.post(`${this.$axios.defaults.baseURL}auth/reservation`, sendData);
        this.$router.push("/done");
      } catch(error) {
        const peopleError = error.response.data.error.number_of_people;
        const dateError = error.response.data.error.reservation_date;
        alert((peopleError || '')
          + (peopleError && "\n")
          + (dateError || '')
        );
      }
    },
  }, // end methods

  created() {
    this.getShop();
    this.getCurrentDate();
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
.main-container{
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}
.search-container{
  display: none;
}
.info-container{
  width: 45%;
}
.content-name{
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
.chevron-left{
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #808080;
}
.shop-name{
  font-size: 30px;
  margin-left: 20px;
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
  height: 840px;
  border-radius: 10px;
}
.ttl{
  height: 15%;
  font-size: 28px;
  font-weight: bold;
  padding: 40px 0px 0px 40px;
}
.reservation-content{
  height: 85%;
}
.reservation-form{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.reservation-form > * {
  margin: 0px 40px 10px 40px;
}
.date-input{
  width: 40%;
  background-color: #fff;
  border-radius: 5px;
}
.error-text{
  color: rgb(0, 0, 0);
}
.confirmation-container{
  background-color: rgb(85, 128, 247);
  padding: 20px;
  border-radius: 10px;
}
td{
  width: 100px;
  padding: 5px 0px;
}
.reservation-btn{
  width: 100%;
  color: #fff;
  padding: 20px 0px;
  background-color: rgb(0, 63, 245);
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: auto 0px 0px 0px;
  cursor: pointer;
}
.recommending-container > *{
  border-radius: 10px;
  margin: 10px 40px;
}
.form-container{
  background-color: #fff;
}
.v-input{
  flex: none;
}
.theme--light.v-application {
  background: rgb(238, 238, 238);
}

@media screen and (max-width: 768px) {
  .main-container{
    flex-direction: column;
  }
  .info-container,
  .reservation-container{
    width: 100%;
  }
}
</style>
