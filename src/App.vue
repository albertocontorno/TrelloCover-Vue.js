<template>
  <div id="app"> 
    <div class="main-container">
      <!-- <div class="nav">NEXT NAVBAR</div> -->
      <Navbar @logout="logout()"/>

      <div class="sub-container">
        <!-- <Board/> -->
        <router-view/>
      </div>
    </div>
    <Dialog/>
  </div>
</template>

<script>
import {AuthService} from "./js/services/auth.service";
import Navbar from "./components/Navbar";
import CardsContainer from "./components/CardsContainer";
import Dialog from "./components/Dialog";
export default {
  name: "App",
  components: {
    Navbar,
    CardsContainer,
    Dialog
  },
  inject: ['authService', 'modalsService'],
  data(){
    return {
      
    }
  },
  methods:{
    logout(){
      this.authService.logout();
    }
  }
};
</script>

<style>

body, html{
  margin: 0;
  height: 100%
}

label{
    font-size: 15px;
    font-weight: bold;
    font-family: monospace;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  height: 100%;
}

.no-margin{
  margin: 0px;
}

.no-margin-top{
  margin-top: 0px !important;
}

.no-margin-bottom{
  margin-bottom: 0px!important;
}

.margin-5{
  margin: 5px;
}

.margin-tb-5{
  margin-top: 5px;
  margin-bottom: 5px;
}

.margin-tbr-5{
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
}

.margin-t-5{
  margin-top: -5px;
}
.margin-l-5{
  margin-left: 5px;
}

.icon-right{
  margin-right: 5px;
}

.font-14{
  font-size: 14px!important;
}

.font-20{
  font-size: 20px!important;
}

.font-110{
  font-size: 110%!important;
}

.font-bold{
  font-weight: bold!important;
}

.float-right{
  float: right!important;
}

.float-left{
  float: left!important;
}

.main-container{
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  height: 100%;
}

.sub-container{
  height: 100%;
  position: relative;
}

.w-100{
  width: 100% !important;
}

.clickable{
  cursor: pointer;
}

/**ROW COL**/
.col-remove-padding{
  padding: 0!important;
}

.col-add-padding-tb{
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
}
.row{
  max-width: 100%;
}

/* REMOVE */
.nav{
  height: 20px;
  background-color: blue;
  position: static;
}
</style>
