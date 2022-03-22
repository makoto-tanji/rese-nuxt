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
            <select v-model="reservationTime" required>
              <option
                v-for="time in reservationTimeOption"
                :key="time.id"
                :value="time.value"
              >
                {{ time.value }}
              </option>
            </select>
            <select v-model="reservationPeopleNumber" required>
              <option
                v-for="people in reservationPeopleNumberOption"
                :key="people.id"
                :value="people.number"
              >
                {{ people.number }}人
              </option>
            </select>
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
  </div>
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
        {id: 1, value: "10:00"},
        {id: 2, value: "10:30"},
        {id: 3, value: "11:00"},
        {id: 4, value: "11:30"},
        {id: 5, value: "12:00"},
        {id: 6, value: "12:30"},
        {id: 7, value: "13:00"},
        {id: 8, value: "13:30"},
        {id: 9, value: "14:00"},
        {id: 10, value: "14:30"},
        {id: 11, value: "15:00"},
        {id: 12, value: "15:30"},
        {id: 13, value: "16:00"},
        {id: 14, value: "17:30"},
        {id: 15, value: "18:00"},
        {id: 16, value: "18:30"},
        {id: 17, value: "19:00"},
        {id: 18, value: "19:30"},
        {id: 19, value: "20:00"},
        {id: 20, value: "20:30"},
        {id: 21, value: "21:00"}
      ],
      // 予約人数プルダウン用
      reservationPeopleNumberOption: [
        {id: 1, number: 1},
        {id: 2, number: 2},
        {id: 3, number: 3},
        {id: 4, number: 4},
        {id: 5, number: 5},
        {id: 6, number: 6}
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
      await this.$axios.post("http://127.0.0.1:8000/api/reservation", sendData);
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
</style>
