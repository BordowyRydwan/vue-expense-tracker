<template>
  <div class="container" @click="xToggle(); handleClick();" ref="container">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  methods: {
    xToggle: function() {
      this.$refs.container.classList.toggle('active');

      this.$parent.$parent.menu_shrink = !this.$parent.$parent.menu_shrink;
      document.querySelector('#app > div:nth-child(2)').classList.toggle('div__shrink');
    },
    handleClick: function() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container{
    display: flex;
    flex-direction: column;
    height: 10vh;
    min-height: 60px;
    justify-content: center;
    transition-duration: 0.2s;
    padding-left: 10px;

    .bar{
      width: 25px;
      height: 3px;
      background-color: #666;
      margin-top: 5px;
      border-radius: 5px;
      transition-duration: 0.2s;
    }
  }

  .active{
    :nth-child(1){
      transform: translateY(6px) rotate(45deg);
    }
    :nth-child(2){
      display: none;
    }
    :nth-child(3){
      transform: translateY(-2px) rotate(-45deg);
    }
  }

  @media (max-width: 400px) {
    .container{
      display: none;
    }
  }
</style>