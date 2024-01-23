<template>
  <div class="logo-flex">
    <img :src="logo" alt="" class="logo-img" />
  </div>
</template>

<script setup lang="ts">
  import logo from '../assets/images/efun.png'
</script>

<style scoped>
  .logo-img {
    height: 10rem;
    width: auto;
  }
  .logo-flex {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 15vw;
  }
  .logoTag {
    font-size: 2rem;
  }
</style>
