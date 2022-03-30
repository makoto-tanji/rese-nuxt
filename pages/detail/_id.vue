<template>
  <v-app>
    <div class="main-container">
      <div class="info-container">
        <HeaderComponent />
        <div class="content-name">
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
          <form @submit.prevent="reserve" class="reservation-form">
            <input
              type="date"
              v-model="reservationDate"
              class="date-input"
              required
            />
            <v-select
              :items="reservationTimeOption"
              v-model="reservationTime"
              outlined
              dense
              background-color="white"
              placeholder="10:00"
            />
            <v-select
              :items="reservationPeopleNumberOption"
              v-model="reservationPeopleNumber"
              outlined
              dense
              suffix="人"
              background-color="white"
              placeholder="1人"
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
          </form>
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
export default {
  data() {
    return {
      // 表示用
      shopData: "",
      areaName: "",

      // 予約データ送信用
      reservationDate: "",
      reservationTime: "",
      reservationPeopleNumber: "",

      // 予約時間プルダウン用
      reservationTimeOption: [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00"
      ],
      // 予約人数プルダウン用
      reservationPeopleNumberOption: [
        1,
        2,
        3,
        4,
        5,
        6
      ]
    }
  }, // end data
  methods: {
    async getShop() {
      const resData = await this.$axios.get(
        'http://127.0.0.1:8000/api/shop/' + this.$route.params.id
      );
      this.shopData = resData.data.data[0];
      this.areaName = resData.data.data[0].area.area_name;
    },
    async reserve() {
      const sendData = {
        shop_id: this.shopData.id,
        user_id: this.$auth.user.id,
        number_of_people: this.reservationPeopleNumber,
        reservation_date: this.reservationDate + ' ' + this.reservationTime,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/auth/reservation", sendData);
      this.$router.push("/done");
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
  font-size: 30px;
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
</style>
