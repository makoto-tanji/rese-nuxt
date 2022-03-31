<template>
  <v-app>
    <!-- appプロパティが必要です -->
    <v-app-bar app>ba-</v-app-bar>

    <v-main>
      <v-container>
        Hello World
      </v-container>
      <div class="purple darken-2 text-center">
        <span class="white--text">Lorem ipsum</span>
      </div>
    </v-main>
    <button @click="test">test</button>
    <p>{{ $store.state.favoriteShopList }}</p>
    <h1>baseURL</h1>
    <p>API_URL {{ testURL }}</p>
    <p>axios baseURL {{ axiosBaseURL }}</p>
    <h1>グローバル変数</h1>
    <p>{{rto}}</p>
    <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          label="Standard"
        ></v-select>
      </v-col>

      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          filled
          label="Filled style"
        ></v-select>
      </v-col>

      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          label="Outlined style"
          outlined
        ></v-select>
      </v-col>

      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          label="Solo field"
          solo
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        testURL: process.env.apiURL,
        axiosBaseURL : this.$axios.defaults.baseURL,
        rto: this.$reservationTimeOption
      };
    },
    methods: {
      test() {
        console.log(process.env.apiURL);
        console.log(this.$reservationTimeOption);
      },
    }
  }
</script>