<template>
  <div class="body-container">
    <HeaderComponent />
    <div class="main-container">
      test
      <p v-if="$auth.loggedIn">Name：{{ $auth.user.name }}</p>
    </div>
  </div>
</template>