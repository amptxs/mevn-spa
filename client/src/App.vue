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
        items: []
      }
    },
    methods: {
      sessionActive: function () {
        const matchSession = document.cookie.match(RegExp('(?:^|;\\s*)' + "session-token" + '=([^;]*)'));
        return !!matchSession;
      },
      getText: function () {
        var context = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://localhost:44305/api/Modder');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
          const json = JSON.parse(xhr.responseText);
          var text = json.split(';');
          context.items.push({tag:text[1], text: text[0]});
        };
        xhr.send();
      },
    },
    beforeMount() {
      this.getText();
    },
    watch: {
      items: function(val) {
        if (val && this.items.length < 3) {
          this.getText();
        }
      }
    }
  }
</script>

<style>
  body {
    background-color: #f2f2f2;
    font-family: arial;
    margin: 0;
  }
</style>
