<template>
  <div id="app">
    <Menu />
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'app',

  components: {
    Menu,
  },

  created() {
    if(!localStorage.getItem('bill')){
      localStorage.setItem('bill', []);
    }
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
