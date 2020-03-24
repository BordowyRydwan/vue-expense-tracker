<template>
  <div>
    <li>
      <img :src="require(`../assets/${icon_name}`)" :alt="caption" />
      <p ref="caption" :class="{item__active: isDisplayed, item__inactive: !isDisplayed}">{{caption}}</p>
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
  min-height: 50px;
  padding-left: 10px;

  display: flex;
  align-items: center;

  img{
    transform-origin: 50% 50%;
    transform: scale(0.8);
    transition-duration: 0.2s;
    margin-right: 20px;
    width: 27px;
    height: 27px;
  }

  img:hover{
    transform: scale(0.9);
  }

  .item__active{
    transform: translateX(0vw);
    transition-duration: 0.5s;
  }

  .item__inactive{
    transform: translateX(-20vw);
    transition-duration: 0.8s;
    display: none;
  }

  p{
    overflow: hidden;
  }

}

@media (max-width: 600px) {
  li{
    justify-content: left;
    padding-left: 10px;

    .item__inactive{
      transition-duration: 0.3s;
    }
  }
}

@media (max-width: 400px){
  li{
    height: 50px;
  }
}

</style>
