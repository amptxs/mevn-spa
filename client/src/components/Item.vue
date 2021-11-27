<template>
  <div id="item">
    <div id="wrong" v-on:click="$emit('remove', processSelection())">✖</div>
    <div id="text"> <div id="tag">{{tag}}</div>{{text}}</div>
    <div id="right" v-on:click="$emit('remove', processSelection())">✔</div>
  </div>
</template>

<script>
  export default {
    props: ['text', 'tag'],
    methods: {
      processSelection: function () {
        var id = document.cookie.match(RegExp('(?:^|;\\s*)' + "id" + '=([^;]*)'))[1];
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/rating');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
          var pointsElement = document.getElementById("points");
          var points = (parseFloat(pointsElement.innerText) + 0.01).toFixed(2)
          pointsElement.innerText = points;
          document.cookie = "points=" + points;
        };
        xhr.send('id=' + id);
      }
    }
  }
</script>

<style scoped>

  #item{
    background-color: white;
    border-radius: 30px;
    border-color: gainsboro;
    border-style: solid;
    border-width: 2px;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #wrong, #right{
    padding: 60px 50px 55px 60px;
    border-color: gainsboro;
    border-style: solid;
    cursor: pointer;
  }
  #wrong{
    border-radius: 30px 0px 0px 30px;
    border-width: 0px 2px 0px 0px;
  }
  #wrong:hover{
    background-color: #ff7c7c;
  }
  #right
  {
    border-radius: 0px 30px 30px 0px;
    border-width: 0px 0px 0px 2px;
  }
  #right:hover{
    background-color: #7eb47e;
  }
  #text{
    padding-left: 30px;
    padding-right: 30px;
    font-size: 20px;
    padding-bottom: 20px;
  }
  #tag{
    background-color: #f3f3f3;
    font-style: italic;
    padding: 2px 10px 2px 10px;
    border-radius: 10px;
    width: max-content;
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>
