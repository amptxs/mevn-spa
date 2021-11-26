<template>
  <div id="app">
    <ActionBar :username="user.username"/>
    <div class="g-signin2" id="google-signin-btn"></div>
    <a href="#" v-on:click="signOut">Sign out</a>


  </div>
</template>

<script>
import ActionBar from "./components/ActionBar";
export default {
  components: {ActionBar},
  methods:{
    onSignIn: function(googleUser) {
      var context = this
      var test = "alex"
      var id_token = googleUser.getAuthResponse().id_token;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/auth');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function() {
        const json =  JSON.parse(xhr.responseText)
        document.cookie = "session-token=" + json.token;
        context.user.username = json.given_name;
      };
      xhr.send('token=' + id_token);
    },
    signOut: function() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      document.cookie = "session-token=" + '=; Max-Age=0'
    }
  },
  mounted(){
    gapi.signin2.render('google-signin-btn', {
      onsuccess: this.onSignIn
    })
  },
  data() {
    return {
      user: {
        username: "test"
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
