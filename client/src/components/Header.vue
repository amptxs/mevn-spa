<template>
  <header>
    <div style="display: none" class="g-signin2"></div>

    <nav class="nav">
      <div id="pic"><img :src="user.picture"></div>
      <div id="name"><h1>{{user.username}}</h1></div>
      <ul>
        <li>Points: {{user.points}}</li>
        <li v-if="user.username == null" id="signin">
          <div id="google-signin-btn" class="g-signin2" data-onsuccess="onSignIn"></div>
        </li>
        <li v-else id="signout"><a href="#" v-on:click="signOut">Sign out</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {

    methods: {
      onSignIn: function (googleUser) {
        var context = this
        var id_token = googleUser.getAuthResponse().id_token;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/auth');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
          console.log('User signed.');
          const json = JSON.parse(xhr.responseText)
          document.cookie = "session-token=" + json.token;
          document.cookie = "name=" + json.given_name;
          document.cookie = "picture=" + json.picture;
          context.user.session_token = json.token;
          context.user.picture = json.picture;
        };
        xhr.send('token=' + id_token);
      },
      signOut: function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
        document.cookie = "session-token=" + '=; Max-Age=0'
        document.cookie = "name=" + '=; Max-Age=0'
        document.cookie = "picture=" + '=; Max-Age=0'
        window.location.reload();
      }
    },
    mounted() {
      var matchName = document.cookie.match(RegExp('(?:^|;\\s*)' + "name" + '=([^;]*)'));
      this.user.username = matchName ? matchName[1] : null;

      var matchPicture = document.cookie.match(RegExp('(?:^|;\\s*)' + "picture" + '=([^;]*)'));
      this.user.picture = matchPicture ? matchPicture[1] : null;

      gapi.signin2.render('google-signin-btn', {
        onsuccess: this.onSignIn
      });
    },
    data() {
      return {
        user: {
          username: null,
          picture: null,
          points: 10,
          session_token: 0
        }
      }
    }
  }
</script>

<style scoped>
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  header {
    background-color: #fff;
    position: fixed;
    width: 100%;
    padding: 20px 40px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav ul {
    list-style: none;
    display: table-cell;
  }

  nav ul li {
    font-weight: 600;
    padding: 0px 14px;
    display: table-cell;
    vertical-align: middle;
  }

  h1, h2 {
    font-weight: normal;
    margin: 0;
  }

  #name{
    margin-right: auto;
    margin-left: 20px;
  }

  img{
    height: 30pt;
    border-radius: 30pt;
  }
</style>
