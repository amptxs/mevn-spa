<template>
  <div id="item">
    <div id="info">
      <h1>Добро пожаловать!</h1>
      <br>Это небольшое приложение помогает нам становится лучше с вашей помощью!
      <p>Мы – небольшая развивающаяся команда, разрабатываем решение для автоматической модерации текста
      с помощью машинного обучения и нам нужна ваша помощь в классификации.</p>
      Всё что нужно – подтвердить корректно ли распознала наша система содержание текста,
      а чтобы было интереснее мы добавили рейтинг!
      <p>Чтобы получить доступ к модерированию пожалуйста авторизируйтесь.</p>
    </div>
    <div id="score">
      <UserScore picture="https://lh3.googleusercontent.com/a-/AOh14GiQI47AgIhlYXJ4lt6JdJj4KySh3fdZMuRONGNy=s96-c"
                 name="Alexander" points="10.00"/>
      <UserScore picture="https://i0.wp.com/colourlex.com/wp-content/uploads/2021/02/Chrome-red-painted-swatch-N-300x300.jpg"
                 name="Ivan" points="9.05"/>
      <UserScore picture="https://www.eparket.com/images/product/9/88175/CT-170-060_1.jpg"
                 name="Arkady" points="8.35"/>
      <UserScore picture="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEUAAP+KeNJXAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
                 name="Anton" points="5.30"/>
      <UserScore picture="https://cdn.webshopapp.com/shops/66605/files/264371468/oracal-970-canary-yellow.jpg"
                 name="Daniel" points="5.12"/>
    </div>
  </div>
</template>

<script>
  import UserScore from "./UserScore.vue";
  export default {
    components: {UserScore}
  }
</script>

<style scoped>
  h1{
    font-weight: bold;
    font-size: larger;
    margin: 0;
  }
  #item{
    background-color: white;
    border-radius: 30px;
    border-color: gainsboro;
    border-style: solid;
    border-width: 2px;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 20px;
    padding: 25px 25px 15px 25px;
    font-size: 20px;
  }
  #info, #score{
    display: inline-block;
  }
  #info{
    width: 68%;
    margin-right: 2%;
    text-align: justify;
  }
  #score{
    width: 28%;
    border-style: solid;
    border-width: 0px 0px 0px 2px;
    border-color: gainsboro;
    padding-left: 1%;
  }
</style>
