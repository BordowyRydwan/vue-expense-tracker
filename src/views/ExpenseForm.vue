<template>
  <div class="expenseForm">
    <form action="" @submit.prevent="onSubmit">
      <h1>
        ADD YOUR EXPENSE
      </h1>
      <div>
        <label for="expenseSelect">Expense type:</label>
        <select name="expenseType" id="expenseSelect" v-model="type" required>
          <option value="Food and drink">Food and drink</option>
          <option value="Transport">Transport</option>
          <option value="Rent">Rent</option>
          <option value="Hobby">Hobby</option>
          <option value="Household">Household</option>
          <option value="Other expenses">Other expenses</option>
        </select>
      </div>
      <div>
        <label for="expenseDescription">Description: </label>
        <input type="text" id="expenseDescription" required v-model="desc" @keypress="cleanOutput">
      </div>
      <div>
        <label for="expenseValue">Value:</label>
        <div class="wrap">
          <input type="text" v-model.number="amount" id="incomeValue" required @keypress="cleanOutput"> PLN
        </div> 
      </div>
      <div>
        <p class="output"></p>
      </div>
      <button type="submit" @click="save">Confirm</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'expenseForm',
    data(){
      return{
        type: 'Rent',
        desc: '',
        amount: 0,
        errors: [],
        bill: []
      }
    },

    computed: {
      id: function() {return this.bill.length}
    },

    mounted(){
      if(localStorage.getItem('bill')){
        try {
          this.bill = JSON.parse(localStorage.getItem('bill'));
        } catch(e) {
          localStorage.removeItem('bill');
        }
      }

      if(this.$parent.menu_shrink){
        document.querySelector('#app > div:nth-child(2)').classList.add('div__shrink');
      }
    },

    methods: {
      save: function () {

        let exportData = {
          id: this.id,
          type: this.type,
          desc: this.desc,
          amount: -Math.abs(parseFloat(this.amount).toFixed(2)),
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString()
        };

        const currencyRegex = /^[0-9]\d*(((,\d{3}){1})?((,|\.)\d{0,2})?)/;

        if(this.desc.length < 1){
          this.errors.push('No description added');
        }

        if(!currencyRegex.test(this.amount.toString()) || this.amount === 0){
          this.errors.push('Bad number format');
        }

        if(this.amount > Math.pow(10, 12)){
          this.errors.push('You ain\'t spent that much, fool');
        }

        if(this.errors.length === 0){
          this.bill.push(exportData);
          localStorage.setItem('bill', JSON.stringify(this.bill))

          this.id += 1;
          this.amount = 0;
          this.desc = '';

          document.querySelector('.output').classList.remove('error');
          document.querySelector('.output').classList.add('correct');

          document.querySelector('.output').innerHTML = 'Data sent correctly';
        } else{
          document.querySelector('.output').classList.remove('correct');
          document.querySelector('.output').classList.add('error');

          document.querySelector('.output').innerHTML = this.errors.join('<br>');
        }
      },
      cleanOutput: function () {
        document.querySelector('.output').innerHTML = '';
        this.errors.length = 0;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Rubik', 'Lucida Sans';
    font-weight: bold;
  }

  form{
    height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;

    div:not(.wrap) > *{
      width: 300px;
      display: block; 
    }

    .wrap > input{
      max-width: 200px;
      margin-right: 10px;
    }

    input{
      max-width: 300px;
    }
  }

  .expenseForm{
    margin-left : 50px;
    width: calc(100vw - 50px);
    height: 100vh;
    transition-duration: 0.8s;
    
    form > *{
      margin-bottom: 5vh;
    }

    form > h1{
      margin-bottom: 8vh;
    }

    label{
      margin-bottom: 1vh;
    }

    select{
      padding: 5px 10px;
    }

    input{
      border: 0px;
      border-bottom: 1px gray solid;
      height: 30px;
      font-size: 16px;
      padding: 0px 10px;
      background-color: transparent;
    }

    input:focus, input:active{
      border: 0px;
      border-bottom: 1px black solid;
    }

    input:required{
      box-shadow: none;
    }
  }

  .div__shrink{
    margin-left: 230px;

    width: calc(100vw - 250px);
    transition-duration: 0.3s;
  }

  .correct{
    color: green;
  }

  .error{
    color: red;
  }

  button{
    padding: 10px 15px;
    background: linear-gradient(rgb(228, 227, 227) 0%, rgb(206, 199, 199) 100%);
    box-shadow: none;
    border: 1px rgb(199, 198, 198) solid;
    border-radius: 3px;
    box-shadow: 0px 1px 1px gray;
    margin-bottom: 50px;
  }

  button:hover{
    background: linear-gradient(rgb(243, 242, 242) 0%, rgb(223, 220, 220) 100%);
  }

  @media (max-width: 400px){
    .expenseForm{
      margin-left: 0px;
      margin-top: 90px;

      height: calc(100vh - 50px);
      width: 100vw;

      form > h1{
        font-size: 1.7rem;
        margin-bottom: 5vh;
      }

      button{
        margin-bottom: 100px;
      }
    }

    form{
      div:not(.wrap) > *{
        width: 80vw;
      }

      .wrap > input{
        max-width: 60vw;
      }
  
      input{
        max-width: 80vw;
      }
    }
  }
</style>