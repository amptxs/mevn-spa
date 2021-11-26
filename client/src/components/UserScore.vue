<template>
  <div id="userScore">
    <span id="pic"><img :src="picture"></span>
    <span id="name">{{name}}</span>
    <span id="points">{{points}} ₴</span>
  </div>
</template>

<script>
  export default {
    props: ['name', 'picture', 'points']
  }
</script>

<style scoped>
  img{
    height: 35pt;
    border-radius: 35pt;
    margin-left: 10px;
    margin-right: 15px;
    margin-bottom: 0;
  }
  #userScore{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    width: auto;
    margin-bottom: 17px;
  }
  #points, #pic, #name
  {
    display:inline-block;
  }
  #points{
    margin-left: auto;
  }
  #pic{
    height: 35pt;
  }
</style>
