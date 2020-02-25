<template>
  <div class="stats">
    <div class="balance">
      <h1>STAN KONTA: <span :class="{
        green: getBalance() >= 0,
        red: getBalance() < 0
      }">
        {{getBalance()}}
      </span> PLN</h1>
    </div>
    <ul class="last_activities">
      <h2 v-if="entries.length > 0">Ostatnie transakcje:</h2>
      <h2 v-else>Nie dokonano żadnych transakcji</h2>
      <li v-for="entry in entries.sort((a, b) => b.id - a.id).slice(0, 10)" v-bind:key="entry.id">
        <p>{{entry.desc}}</p>
        <p>{{entry.amount.toFixed(2)}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  data(){
    return {
      entries: []
    }
  },

  mounted() {
    Object.keys(localStorage).forEach(key => {
      this.entries.push(JSON.parse(localStorage.getItem(key)));
    }); 
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
    margin-left : 50px;
    padding-top: 100px;
    width: calc(100vw - 50px);
    height: 100vh;

    display: flex;
    flex-direction: column;

    align-items: center;
  }

  .balance{
    font-size: 1rem;
    font-weight: bold;
  }

  .last_activities{
    list-style-type: none;
    width: 300px;
    margin-top: 50px;

    h2{
      margin-bottom: 20px;
      font-size: 1rem;
    }

    li{
      border-bottom: 1px gray solid;
      display: flex;
      justify-content: space-between;
      padding: 4px 10px;
    } 
    
  }

  .red{
    color: red;
  }

  .green{
    color: green;
  }

  @media (max-width: 400px){
    .stats{
      margin-left: 0px;
      margin-top: 50px;

      height: calc(100vh - 50px);
      width: 100vw;
    }
  }
</style>