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

  data(){
    return{
      menu_shrink: false
    }
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
    width: 100vw;
    max-width: 100%;
  }

  .div__shrink{
    margin-left: 200px;
    padding: 50px 0px;
    padding-left: 50px;
    width: calc(100vw - 250px);
    transition-duration: 0.3s;
  }

  select, button, label{
    cursor: pointer;
  }

</style>
