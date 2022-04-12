<template>
  <div class="text-center">
    <v-progress-circular
      indeterminate
      color="#3560f6"
      :size="70"
      :width="7"
    />
  </div>
</template>

<style scoped>
.text-center{
  width: 100vw;
  height: 100vh;
  background: rgb(238, 238, 238);
  position: absolute;
  top: -30px;
  left: -70px;
  z-index: 5;
}
.v-progress-circular {
  margin: 200px;
}
</style>