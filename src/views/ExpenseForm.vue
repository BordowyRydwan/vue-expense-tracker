<template>
  <div class="expenseForm">
    <form action="" @submit.prevent="onSubmit">
      <h1>
        DODAJ WYDATEK
      </h1>
      <div>
        <label for="expenseSelect">Rodzaj wydatku:</label>
        <select name="expenseType" id="expenseSelect" v-model="type" required>
          <option value="food">Żywność</option>
          <option value="travelling">Transport</option>
          <option value="rent">Opłaty mieszkaniowe</option>
          <option value="hobby">Hobby</option>
          <option value="furniture">Wyposażenie domu</option>
          <option value="otherExpenses">Inne</option>
        </select>
      </div>
      <div>
        <label for="expenseDescription">Opis: </label>
        <input type="text" id="expenseDescription" required v-model="desc" @keypress="cleanOutput">
      </div>
      <div>
        <label for="expenseValue">Wartość:</label>
        <div class="wrap">
          <input type="text" v-model.number="amount" id="incomeValue" required @keypress="cleanOutput"> PLN
        </div> 
      </div>
      <div>
        <p class="output"></p>
      </div>
      <button type="submit" @click="save">Potwierdź</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'expenseForm',
    data(){
      return{
        type: 'rent',
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

        const currencyRegex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)/;

        if(this.desc.length < 1){
          this.errors.push('Brak opisu wydatku');
        }

        if(!currencyRegex.test(this.amount.toString()) || this.amount === 0){
          this.errors.push('Nieodpowiedni format liczby');
        }

        if(this.errors.length === 0){
          this.bill.push(exportData);
          localStorage.setItem('bill', JSON.stringify(this.bill))

          this.id += 1;
          this.amount = 0;
          this.desc = '';

          document.querySelector('.output').classList.remove('error');
          document.querySelector('.output').classList.add('correct');

          document.querySelector('.output').innerHTML = 'Dane przesłano poprawnie';
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
    width: inherit;
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
  }

  button:hover{
     background: linear-gradient(rgb(243, 242, 242) 0%, rgb(223, 220, 220) 100%);
  }

  @media (max-width: 400px){
    .expenseForm{
      margin-left: 0px;
      margin-top: 50px;

      height: calc(100vh - 50px);
      width: 100vw;

      form > h1{
        font-size: 1.7rem;
        margin-bottom: 5vh;
      }
    }

    form{
      div:not(.wrap) > *{
        width: 90vw;
      }

      .wrap > input{
        max-width: 70vw;
      }
  
      input{
        max-width: 90vw;
      }
    }
  }
</style>