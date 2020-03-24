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
    <div class="bills_data">
      <ul class="last_activities">
        <li v-if="entries.length > 0">
          <div class="filter">
            <p>Filtruj:</p>
            <p>
              <label for="days">Ostatnich dni: </label> 
              <input type="number" id="days" v-model="daysAmount" min="1">
            </p>
            <p>
              <label for="days">Ostatnich transakcji: </label> 
              <input type="number" id="days" v-model="listSize" min="3">
            </p>
            <p>
              <label for="category">Kategoria:</label> 
              <select name="category" id="category" v-model="type">
                <option value="">brak</option>
                <option value="Praca">Praca</option>
                <option value="Zlecenia">Zlecenia</option>
                <option value="Zywnosc">Żywność</option>
                <option value="Podroze">Transport</option>
                <option value="Mieszkanie">Opłaty mieszkaniowe</option>
                <option value="Hobby">Hobby</option>
                <option value="Meble">Wyposażenie domu</option>
              </select>
            </p>
            <p>
              <label for="name">Nazwa: </label> 
              <input type="text" id="name" v-model="searchedName">
            </p>
          </div>
          <h2>Transakcje:</h2>
        </li>
        <li v-else>Nie wykonano żadnych transakcji</li>
        <li 
          is="ListItem"
          v-for="entry in 
            lastNDaysByCategory(daysAmount, type)
              .slice(0, listSize)
              .filter(x => x.desc.match(searchedName) || searchedName === '')"
          :key="entry.id"
          :itemData="entry"
        ></li>
      </ul>
      <div class="charts">
        <h2>Wydatki z ostatnich {{daysAmount}} dni:</h2>
        <expense-chart 
          :chart-data="expenseChartData"
          :styles="chartStyle"
          ></expense-chart>
        <h2>Przychody z ostatnich {{daysAmount}} dni:</h2>
        <income-chart 
          :chart-data="incomeChartData"
          :styles="chartStyle"
        ></income-chart>
      </div>
    </div>
    
  </div>
</template>

<script>


import ListItem from '../components/ListItem.vue';
import ExpenseChart from '../components/ExpenseChart.vue'
import IncomeChart from '../components/IncomeChart.vue'

export default {
  name: 'Summary',
  components: {
    ListItem,
    ExpenseChart,
    IncomeChart
  },

  data(){
    return {
      entries: [],
      type: '',
      daysAmount: 30,
      listSize: 10,
      searchedName: ''
    }
  },

  computed: {
    sortedEntries: function(){
      return this.entries.slice().sort((a, b) => b.id - a.id);
    },

    expenseCategories: function () {
      return [...new Set(this.sortedEntries
          .filter(x => x.amount < 0)
          .map(x => x.type))];
    },

    expenseByCategories: function () {
      return this.expenseCategories.map(x => {
        let counter = 0;

        this.lastNDaysByCategory(this.daysAmount).forEach(element => {
          element.type === x ? counter += Math.abs(element.amount) : 0;
        });

        return counter;
      });
    },

    expenseChartData: function () {
      return {
        labels: this.expenseCategories,
        datasets: [
          {
            label: 'Kategorie',
            backgroundColor: '#f87979',
            data: this.expenseByCategories,
          }
        ],
      }
    },

    incomeCategories: function () {
      return [...new Set(this.sortedEntries
          .filter(x => x.amount > 0)
          .map(x => x.type))];
    },

    incomeByCategories: function () {
      return this.incomeCategories
          .map(x => {
            let counter = 0;

            this.lastNDaysByCategory(this.daysAmount).forEach(element => {
              element.type === x ? counter += Math.abs(element.amount) : 0;
            });

            return counter;
          });
    },

    incomeChartData: function () {
      return {
        labels: this.incomeCategories,
        datasets: [
          {
            label: 'Kategorie',
            backgroundColor: '#10dd21',
            data: this.incomeByCategories,
          }
        ],
      }
    },

    chartStyle: function () {
      return{
        height: `200px`,
        position: 'relative',
        left: '-10px'
      }
    },
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
      return this.sortedEntries
          .reduce((acc, entry) => acc + entry.amount, 0)
          .toFixed(2)
    },

    selectByCategoryAndMonth: function (category = '', month = null) {
      return this.sortedEntries
          .filter(entry => entry.type === category || category === '')
          .filter(entry => entry.month === month || month === null);
    },

    lastNDaysByCategory: function(n = 0, category = '') {
      const now = new Date();
      const then = new Date() - 1000*60*60*24*n;

      return this.sortedEntries
          .filter(entry => {
            const arr = entry.date.split('.').map(x => parseInt(x));
            const date = new Date(arr[2], arr[1] - 1, arr[0]);

            return (date > then && date < now) || n === 0;
          })
          .filter(entry => entry.type === category || category === '');
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

  .bills_data{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .balance{
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    p{
      font-size: 1.7rem;
    }
  }

  .filter{

    *{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    p input{
      &{
        border: 0px;
        border-bottom: 1px gray solid;
        height: 30px;
        font-size: 16px;
        padding: 0px 10px;
        background-color: transparent;
        margin-left: 20px;
      }

      &:focus, &:active{
        border: 0px;
        border-bottom: 1px black solid;
      }

      &:required{
        box-shadow: none;
      }
    }

    p:first-child{
      font-weight: bold;
      margin-bottom: 20px;
    }

    p:not(:first-child){
      text-indent: 10px;
      margin: 10px 0;
      width: 90%;

      label{
        width: 200px;
      }

      input{
        width: 60px;
      }
    }

    p:last-child{
      input{
        width: 180px;
      }
    }
  }

  .last_activities{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin-top: 20px;
    margin-bottom: 10px;

    h2{
      margin-top: 30px;
      margin-bottom: 0px;
      font-size: 1rem;
    }

    li:first-child{
      margin-bottom: 20px;
      padding-left: 5px;
      width: calc(90vw - 50px);
      max-width: 400px;
    }
  }

  .charts {

    max-width: 400px;
    width: 95%;
    z-index: 1;

    h2{
      margin-top: 20px;
      margin-bottom: 10px;
      font-size: 1rem;
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

    .filter{
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
      justify-content: center;
      flex-direction: column;

      p{
        margin-top: 10px;
        font-size: 1.7rem;
      }
    }
   }

    @media (max-width: 1000px){
      .bills_data{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
      }

      .charts{
        margin-top: 20px;
      }
    }
</style>