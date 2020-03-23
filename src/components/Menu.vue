<template>
  <div>
    <aside class="menu" ref="menu" :class="{
      menu__inactive: displaySwitches % 2 === 0,
      menu__active: displaySwitches % 2 === 1
      }
    ">
      <ul>
        <Hamburger @click="showMenu" />
        <router-link to="/incomes">
          <MenuItem 
            icon_name="income_icon.png" 
            caption="Przychody"
            :isDisplayed="isMenuDisplayed"
          />
        </router-link>
        <router-link to="/expenses">
          <MenuItem 
            icon_name="money_icon.png" 
            caption="Wydatki"
            :isDisplayed="isMenuDisplayed"
          />
        </router-link>
        <router-link to="/">
          <MenuItem 
            icon_name="chart_icon.png" 
            caption="Podsumowanie"
            :isDisplayed="isMenuDisplayed"
          />
        </router-link>
        <router-link to="/settings">
          <MenuItem 
            icon_name="settings_icon.png" 
            caption="Ustawienia"
            :isDisplayed="isMenuDisplayed"
          />
        </router-link>
      </ul>
    </aside>
  </div>
</template>

<script>
import MenuItem from "./MenuItem"; 
import Hamburger from "./Hamburger"

export default {
  name: "Menu",
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
      this.displaySwitches += 1;
      
      if(this.displaySwitches % 2){
        
        setTimeout(() => {
          this.isMenuDisplayed = !this.isMenuDisplayed;
        }, 100)

      } else{

         setTimeout(() => {
          this.isMenuDisplayed = !this.isMenuDisplayed;
        }, 200)

      } 
    }
  }
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
  background-color: rgb(249, 253, 253);

  ul {
    list-style-type: none;
  }
}

.menu__inactive{
  width: 50px;
  transition-duration: 2s;
}

.menu__active{
  width: 200px;
  transition-duration: 0.5s;
}

a:link,
a:hover,
a:active,
a:visited{
  text-decoration: none;
  color: #444;
}

a:hover{
  transform: scale(0.95);
}

@media (max-width: 600px) {
  .menu__active{
    width: 100vw;
  }

  .menu__inactive{
    transition-duration: 1s;
  }
}

@media (max-width: 400px){
  .menu{
    width: 100vw;
    height: 50px;
    display: flex;
    flex-direction: row;
    border-right: 0px;

    ul{
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100vw;
      height: 50px;
      border-bottom: 1px #666 solid;
      
    }
  }
}
</style>