<template>
  <div class="body-container">
    <HeaderComponent />
    <div class="main-container">
      <p v-if="$auth.loggedIn" class="user-name">{{ $auth.user.name }}さん</p>
      <div class="main-content">
        <div class="reservation-container">
          <p class="ttl">予約状況</p>
          <div
            v-for="reservation in userData.reservations"
            :key="reservation.id"
            class="reservation-content main-bg-color"
          >
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: '',
    };
  }, // end data
  methods: {
    async getUser(){
      const userData = await this.$axios.get(
        'http://127.0.0.1:8000/api/auth/user'
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
    }
  }, // end methods
  created() {
    this.getUser();
  }
}
</script>

<style scoped>
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
  padding: 40px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px #505050;
  margin-top: 20px;
}
td{
  width: 100px;
  padding: 5px 0px;
}
.favorite-container{
  width: 40%;
  background-color: red;
}
</style>
