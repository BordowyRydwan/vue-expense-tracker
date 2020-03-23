<template>
  <div class="incomeForm">
    <form action="" @submit.prevent="onSubmit">
      <h1>
        DODAJ PRZYCHÓD
      </h1>
      <div>
        <label for="incomeSelect">Rodzaj przychodu:</label>
        <select name="incomeType" id="incomeSelect" v-model="type" required>
          <option value="salary">Praca</option>
          <option value="contracts">Zlecenia</option>
          <option value="otherIncomes">Inne</option>
        </select>
      </div>
      <div>
        <label for="incomeDescription">Opis: </label>
        <input type="text" id="incomeDescription" v-model="desc" @keypress="cleanOutput" required>
      </div>
      <div>
        <label for="incomeValue">Wartość:</label>
        <div class="wrap">
        <input type="text" v-model="amount" id="incomeValue" @keypress="cleanOutput" required> PLN
        </div> 
      </div>
      <div>
        <p class="output"></p>
      </div>
      <button type="submit" @click="save" >Potwierdź</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'incomeForm',
    data(){
      return{
        type: 'salary',
        desc: '',
        amount: 0,
        errors: [],
        bill: []
      }
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

    computed: {
      id: function() {return this.bill.length}
    },

    methods: {
      save: function () {

        let exportData = {
          id: this.id,
          type: this.type,
          desc: this.desc,
          amount: Math.abs(parseFloat(this.amount).toFixed(2)),
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString()
        };

        const currencyRegex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

        if(this.desc.length < 1){
          this.errors.push('Brak opisu przychodu');
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
      display: block;
      width: 300px;
    }

    .wrap > input{
      max-width: 200px;
      margin-right: 10px;
    }
  

    input{
      max-width: 300px;
    }
  }

  .incomeForm{
    margin-left : 50px;
    width: calc(100vw - 50px);
    height: 100vh;

    form > *{
      margin-bottom: 5vh;
    }

    form > h1{
      margin-bottom: 8vh;
      margin-top: 0px;
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
    .incomeForm{
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