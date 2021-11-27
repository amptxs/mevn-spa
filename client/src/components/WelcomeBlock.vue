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
    <div v-if="items.length !== 0" id="score">
      <UserScore v-for="item in items" v-bind:picture="item.Picture" v-bind:name="item.Name" v-bind:points="item.Score"/>
    </div>
  </div>
</template>

<script>
  import UserScore from "./UserScore.vue";
  export default {
    components: {UserScore},
    data() {
      return {
        items: []
      }
    },
    beforeMount() {
      var xhr = new XMLHttpRequest();
      var context = this;
      xhr.open('GET', 'http://localhost:3000/rating');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function () {
        const json = JSON.parse(xhr.responseText);
        context.items = json;
      };
      xhr.send();
    }
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
