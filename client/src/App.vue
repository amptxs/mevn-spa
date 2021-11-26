<template>
  <div id="app">
    <Header/>
    <WelcomeBlock/>
    <Item tag="Оскорбление" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."/>
    <Item tag="Нецензурная лексика" text=" Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. "/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Item from "./components/Item.vue";
import WelcomeBlock from "./components/WelcomeBlock.vue";
export default {
  components: {Header, Item, WelcomeBlock}
}
</script>

<style>
  body {
    background-color: #f2f2f2;
    font-family: arial;
    margin: 0;
  }
</style>
