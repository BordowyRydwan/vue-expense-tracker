<template>
  <div class="stats">
    <div class="balance">
      <h1>STAN KONTA: </h1>
      <p>
        <span :class="{green: getBalance() >= 0,red: getBalance() < 0}">
          {{getBalance()}}
        </span>
        PLN
      </p>
    </div>

    <ul class="last_activities">
      <li v-if="entries.length > 0">Ostatnie {{listSize}} transakcji:</li>
      <li v-else>Nie wykonano żadnych transakcji</li>
      <li 
        is="ListItem"
        v-for="entry in sortedEntries.slice(0, listSize)"
        :key="entry.id"
        :itemData="entry"
      ></li>
    </ul>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue';

export default {
  name: 'Summary',
  components: {
    ListItem
  },

  data(){
    return {
      entries: [],
      listSize: 10
    }
  },

  computed: {
    sortedEntries: function(){
      return this.entries.slice().sort((a, b) => b.id - a.id);
    }
  },

  mounted(){
      if(localStorage.getItem('bill')){
        try {
          this.entries = JSON.parse(localStorage.getItem('bill'));
        } catch(e) {
          localStorage.removeItem('bill');
        }
      }
    },

  methods: {
    getBalance: function () {
      return this.entries
          .reduce((acc, entry) => acc + entry.amount, 0)
          .toFixed(2)
    },

    getBalanceInYear: function (year) {
      return this.entries
          .filter(entry => parseInt(entry.date.split('.')[2]) === year)
          .reduce((acc, entry) => acc += entry.amount, 0)
          .toFixed(2)
    },

    getBalanceInMonth: function (month, year){
      return this.entries
          .filter(entry => parseInt(entry.date.split('.')[1]) === month && parseInt(entry.date.split('.')[2]) === year)
          .reduce((acc, entry) => acc += entry.amount, 0)
          .toFixed(2)
    },

    getBalanceInDay: function (day) {
      return this.entries
          .filter(entry => entry.date === day)
          .reduce((acc, entry) => acc += entry.amount, 0)
          .toFixed(2);
    }
  }
}
</script>

<style lang="scss" scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .stats{
    margin-left: 50px;
    padding: 50px 50px;
    width: calc(100vw - 50px);
    height: 100vh;

    display: flex;
    flex-direction: column;

  }

  .balance{
    font-size: 0.8rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;
    
    p{
      font-size: 1.7rem;
    }
  }

  .last_activities{
    list-style-type: none;
    max-width: 400px;
    margin-top: 20px;

    h2{
      margin-bottom: 20px;
      font-size: 1rem;
    }

    li:first-child{
      margin-bottom: 20px;
      padding-left: 5px;
      width: calc(90vw);
      max-width: 400px;
    }
  }

  .red{
    color: red;
    font-size: 2rem;
    margin-left: 20px;
  }

  .green{
    color: green;
    font-size: 2rem;
    margin-left: 20px;
  }

  @media (max-width: 400px){
    .stats{
      margin-left: 0px;
      margin-top: 30px;

      height: calc(100vh - 50px);
      width: 100vw;
    }
    
    .red{
      font-size: 2.5rem;
      margin-left: 0px;
    }

    .green{
      font-size: 2.5rem;
      margin-left: 0px;
    }

    .last_activities{
      margin-top: 20px;
      width: 90vw;
    }
  }

   @media (max-width: 600px){
     .stats{
       align-items: center;
       padding: 50px 0;
     }

     .balance{
      font-size: 0.8rem;
      font-weight: bold;

      display: flex;
      align-items: center;
      flex-direction: column;

      p{
        margin-top: 10px;
        font-size: 1.7rem;
      }
    }
   }
</style>