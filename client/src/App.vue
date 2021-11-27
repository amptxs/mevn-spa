<template>
  <div id="app">
    <Header/>
    <WelcomeBlock v-if="!sessionActive()"/>
    <item v-if="sessionActive()" v-for="(item, index) in items" v-bind:tag="item.tag" v-bind:text="item.text" v-on:remove="items.splice(index, 1)">
    </item>

  </div>
</template>

<script>
  import Header from "./components/Header.vue";
  import Item from "./components/Item.vue";
  import WelcomeBlock from "./components/WelcomeBlock.vue";
  import Vue from 'vue'

  export default {
    components: {Header, Item, WelcomeBlock},
    data() {
      return {
        items: [
          {tag: 'Лексика', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'},
          {tag: 'Оскорбление', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
        ]
      }
    },
    methods: {
      sessionActive: function () {
        const matchSession = document.cookie.match(RegExp('(?:^|;\\s*)' + "session-token" + '=([^;]*)'));
        return !!matchSession;
      },
    },
  }
</script>

<style>
  body {
    background-color: #f2f2f2;
    font-family: arial;
    margin: 0;
  }
</style>
