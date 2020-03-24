<template>
  <div class="item">
    <div class="description">
      <p>
        {{itemData.desc}}
      </p>
      <p>
        {{itemData.date + ", " + itemData.time}}
      </p>
    </div>
    <div class="right">
      <div class="amount">
        {{itemData.amount.toFixed(2)}}
      </div>
      <div class="buttons">
        <button @click="remove()">
          X
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
    name: 'ListItem',
    props: {
      itemData: Object
    },
    methods: {
      remove: function () {
        this.$parent.entries.splice(this.itemData.id, 1);
        
        this.$parent.entries.slice(this.itemData.id).forEach(element => {
          element.id -= 1;
        });

        localStorage.setItem('bill', JSON.stringify(this.$parent.entries));
      }
    }
}
</script>

<style lang="scss">
  .description{
    p{
      margin-top: 2px;
    }

    p:nth-child(1){
      font-weight: bold;
    }

    p:nth-child(2){
      font-size: 0.8rem;
    }
  }

  .item{
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px gray solid;
    width: calc(90vw - 50px);
    max-width: 400px;
  }

  .description,
  .right{
    padding: 6px 5px;
  }

  .right{
    display: flex;
    justify-content: center;
  }

  .buttons{
    display: flex;
    margin-left: 10px;
    font-weight: bold;

    button{
      box-shadow: none;
      border: none;
      background-color: transparent;
      width: 25px;
      height: 25px;
      margin: 0px 2px;
      text-align: center;
      transition-duration: 0.3s;

      &:nth-child(2){
        transform: rotate(90deg);
        font-size: 1.2rem;
      }

      &:hover{
        transform: scale(0.9);
      }
    }
  }

  @media (max-width: 400px){
    .item{
      width: 90vw;
    }
  }
</style>