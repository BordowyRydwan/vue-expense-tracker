<template>
  <div>
    <aside class="menu" ref="menu" :class="{
      menu__inactive: displaySwitches % 2 === 0,
      menu__active: displaySwitches % 2 === 1
      }
    ">
      <ul>
        <Hamburger @click="showMenu" />
        <MenuItem 
          icon_name="income_icon.png" 
          caption="Przychody"
          :isDisplayed="isMenuDisplayed"
        />
        <MenuItem 
          icon_name="money_icon.png" 
          caption="Wydatki"
          :isDisplayed="isMenuDisplayed"
        />
        <MenuItem 
          icon_name="chart_icon.png" 
          caption="Podsumowanie"
          :isDisplayed="isMenuDisplayed"
        />
        <MenuItem 
          icon_name="settings_icon.png" 
          caption="Ustawienia"
          :isDisplayed="isMenuDisplayed"
        />
      </ul>
    </aside>
  </div>
</template>

<script>
import MenuItem from "./MenuItem"; 
import Hamburger from "./Hamburger"

export default {
  name: "sideMenu",
  components:{
    MenuItem,
    Hamburger
  },
  data(){
    return{
      isMenuDisplayed: false,
      displaySwitches: 0
    }
  },
  methods: {
    showMenu: function(){
      this.displaySwitches += 1
      
      if(this.displaySwitches % 2){
        
        setTimeout(() => {
          this.isMenuDisplayed = !this.isMenuDisplayed
        }, 400)

      } else{

         setTimeout(() => {
          this.isMenuDisplayed = !this.isMenuDisplayed
        }, 200)

      }

      
    }
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.menu {
  font-family: 'Rubik', sans-serif;
  font-weight: bold;
  position: fixed;
  left: 0;
  top: 0;
  color: #444;

  width: 4vw;
  height: 100vh;

  border-right: 2px gray solid;

  ul {
    list-style-type: none;
  }
}

.menu__inactive{
  width: 4vw;
  transition-duration: 2s;
}

.menu__active{
  width: 15vw;
  transition-duration: 0.5s;
}
</style>