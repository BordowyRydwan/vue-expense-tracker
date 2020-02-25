<template>
  <div class="options">
    <h1>USTAWIENIA</h1>
    <ul class="options_list">
      <li class="output">

      </li>
      <li>
        <p>Wyczyść dane</p>
        <button @click="clearData">Wyczyść</button>
      </li>
      <li>
        <p>Przełącz na dark mode</p>
        <button>Przełącz</button>
      </li>
      <li>
        <p>Eksportuj dane do JSON</p>
        <button>Eksport</button>
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

      document.querySelector('.output').textContent = 'Wyczyszczono dane aplikacji';
      document.querySelector('.output').classList.add('correct');
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
    }
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