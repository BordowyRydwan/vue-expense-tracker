<template>
  <div class="expenseForm">
    <form action="" @submit.prevent="onSubmit">
      <h1>
        DODAJ KOSZTY
      </h1>
      <div>
        <label for="expenseSelect">Rodzaj kosztu:</label>
        <select name="expenseType" id="expenseSelect" v-model="type" required>
          <option value="food">Żywność</option>
          <option value="cleaning">Środki czystości</option>
          <option value="rent">Opłaty mieszkaniowe</option>
          <option value="finances">Inwestycje</option>
          <option value="courses">Kursy / szkolenia</option>
          <option value="books">Książki</option>
          <option value="fast_food">Słodycze / fast food</option>
          <option value="home">Wyposażenie domu</option>
          <option value="taxes">Podatki / ZUS</option>
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
        id: localStorage.length,
        errors: []
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

        const currencyRegex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

        if(this.desc.length < 1){
          this.errors.push('Brak opisu wydatku');
        }

        if(!currencyRegex.test(this.amount.toString()) || this.amount === 0){
          this.errors.push('Nieodpowiedni format liczby');
        }

        if(this.errors.length === 0){
           localStorage.setItem(this.id, JSON.stringify(exportData));

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

  .expenseForm{
    margin-left : 50px;
    width: calc(100vw - 50px);
    height: 100vh;

    form{
      width: inherit;
      height: inherit;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0px 20px;

      div:not(.wrap) > *{
        display: block;
        width: 300px;
      }

      input{
        max-width: 300px;
      }
    }

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

  @media (max-width: 400px){
    .expenseForm{
      margin-left: 0px;
      margin-top: 50px;

      height: calc(100vh - 50px);
      width: 100vw;
    }
  }
</style>