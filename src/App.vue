<template>
  <div id="app">
    <SideMenu />
    <router-view />
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue'

export default {
  name: 'app',
  components: {
    SideMenu,
  }
}
</script>

<style lang='scss'>
  @import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Rubik', 'Lucida Sans'
  }

  #app{
    display: flex;
    flex-direction: row;
    background-image: url('../public/bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }

</style>
