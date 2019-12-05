<template>
  <div>
    <li>
      <img :src="require(`../assets/${icon_name}`)" :alt="caption" />
      <p ref="caption" v-show="isDisplayed" :class="{item__active: isDisplayed, item__inactive: !isDisplayed}">{{caption}}</p>
    </li>
  </div>
</template>

<script>
  export default {
    name: "MenuItem",
    props: {
      icon_name: String,
      caption: String,
      isDisplayed: Boolean
    },
    methods: {
      
    }
  };
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  height: 10vh;
  min-height: 60px;
  padding-left: 1vw;

  display: flex;
  align-items: center;

  img{
    transform-origin: 50% 50%;
    transform: scale(0.8);
    transition-duration: 0.2s;
    margin-right: 1vw;
    width: 25px;
    height: auto;
  }

  img:hover{
    transform: scale(0.9);
  }

  .item__active{
    transform: translateX(0vw);
    transition-duration: 2s;
  }

  .item__inactive{
    transform: translateX(-30vw);
    transition-duration: 2s;
  }
}

</style>
