<template>
  <div class="options">
    <h1>Settings</h1>
    <ul class="options_list">
      <li class="output">

      </li>
      <li>
        <p>Clear app data</p>
        <button @click="clearData">Clear</button>
      </li>
      <li>
        <p>Export app data to JSON</p>
        <button @click="exportToJSON('money_data.json')">Export</button>
      </li>
      <li>
        <p>Import app data from JSON</p>
        <label for="json_load" @click="importJSON()">
          Import
        </label>
        <input type="file" id="json_load" accept=".json">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  methods: {
    clearData: function () {
      localStorage.clear();

      document.querySelector('.output').textContent = 'Application data cleared';
      document.querySelector('.output').classList.add('correct');
    },
    exportToJSON: function (filename) {
      
      let text = localStorage.getItem('bill');

      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },

    importJSON: function () {
      let input = document.querySelector("li:last-child > input");
      let bill;

      input.addEventListener("change", function () {
        
        if (this.files && this.files[0]) {
          var myFile = this.files[0];
          var reader = new FileReader();
          
          reader.addEventListener('load', function (e) {
            bill = JSON.parse(e.target.result);

            localStorage.removeItem('bill');
            localStorage.setItem('bill', JSON.stringify(bill));

            document.querySelector('.output').textContent = 'Data have been imported';
            document.querySelector('.output').classList.add('correct');
          });
          
          reader.readAsBinaryString(myFile);
        }   
      });

      
    }
  },

  mounted(){
    if(this.$parent.menu_shrink){
      document.querySelector('#app > div:nth-child(2)').classList.add('div__shrink');
    }
  }
}
</script>

<style lang="scss" scoped>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .options{
    margin-left : 50px;
    width: calc(100vw - 50px);
    height: 100vh;
    transition-duration: 0.8s;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1{
      margin-bottom: 20px;
    }

    ul{
      list-style-type: none;
    }
    
    li{
      display: flex;
      min-width: 270px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 0.9rem;

      &:first-child{
        justify-content: center;
        margin-bottom: 20px;
      }

      &:last-child > input{
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
    }
  }

  .div__shrink{
    margin-left: 230px;

    width: calc(100vw - 250px);
    transition-duration: 0.3s;
  }

  button, label{
    padding: 5px 7px;
    background: linear-gradient(rgb(228, 227, 227) 0%, rgb(206, 199, 199) 100%);
    box-shadow: none;
    border: 1px rgb(199, 198, 198) solid;
    border-radius: 3px;
    box-shadow: 0px 1px 1px gray;
    width: 65px;
    text-align: center;
    font-size: .7rem;
    color:rgb(56, 56, 56);
  }

  .correct{
    color: green;
  }

  @media (max-width: 400px){
    .options{
      margin-left: 0px;
      margin-top: 50px;

      height: calc(100vh - 50px);
      width: 100vw;
    }
  }
</style>