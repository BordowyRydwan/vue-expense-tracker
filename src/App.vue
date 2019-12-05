<template>
  <div id="app">
    <SideMenu />
    
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue'

export default {
  name: 'app',
  components: {
    SideMenu
  }
}
</script>

<style lang='scss' scoped>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app{
    display: flex;
    flex-direction: row;
  }
</style>
