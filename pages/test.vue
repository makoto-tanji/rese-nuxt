<template>
  <v-app>
    <!-- appプロパティが必要です -->
    <v-app-bar app>Header</v-app-bar>

    <v-main>
      <v-container>
        Hello World
      </v-container>
      <div class="purple darken-2 text-center">
        <span class="white--text">Lorem ipsum</span>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Username"
                placeholder="Username"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                placeholder="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                placeholder="Password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            登録
          </v-btn>
        </v-container>
      </v-form>
      <v-form>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Username"
          placeholder="Username"
          required
        />
      </v-form>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
        ],
      };
    },
    methods: {
      testLog() {
        console.log(process.env.apiURL);
        console.log(this.$reservationTimeOption);
      },
      validate () {
        // this.$refs.form.validate()
        console.log(process.env.apiURL);
      },
    }
  }
</script>

