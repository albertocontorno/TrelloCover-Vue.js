import Vue from "vue";
import "flexboxgrid";
import firebase from "firebase";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
   faPen, faTags, faUser, faArrowRight, faClone, faTrash, faEllipsisH, faTimes,
   faAlignLeft, faComment, faList, faChalkboard, faCheckSquare, faClock, faPaperclip,
   faCopy, faEye, faArchive, faShareAlt, faPlus, faCheck, faArrowLeft, faSearchLocation, 
   faLocationArrow, faCogs
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { AuthService } from "./js/services/auth.service";
import { BoardService } from "./js/services/board.service";
import { UtilsService } from "./js/services/utils.service";

library.add(faPen);
library.add(faTags);
library.add(faUser);
library.add(faArrowRight);
library.add(faClone);
library.add(faTrash);
library.add(faEllipsisH);
library.add(faTimes);
library.add(faAlignLeft);
library.add(faComment);
library.add(faList);
library.add(faChalkboard);
library.add(faCheckSquare);
library.add(faClock);
library.add(faPaperclip);
library.add(faCopy);
library.add(faEye);
library.add(faArchive);
library.add(faShareAlt);
library.add(faPlus);
library.add(faCheck);
library.add(faArrowLeft);
library.add(faLocationArrow);
library.add(faSearchLocation);
library.add(faCogs);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyDInHbmAAHBQwZnQAMZFjGX8hydmkVNnwQ",
  authDomain: "trellocover.firebaseapp.com",
  databaseURL: "https://trellocover.firebaseio.com",
  projectId: "trellocover",
  storageBucket: "trellocover.appspot.com",
  messagingSenderId: "255472644984",
  appId: "1:255472644984:web:06d7662e09d7f167"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

new Vue({
  router,
  render: h => h(App),
  provide(){
    return {
      authService: this.authService,
      boardService: this.boardService,
      utilsService: this.utilsService
    }
  },
  
  data:{
    db: db,
    authService: new AuthService(db),
    boardService: new BoardService(db),
    utilsService: new UtilsService()
  },
  mounted(){
    console.log("APP MOUNTED", this)
    this.authService.db = this.db;
    this.authService.vm = this;
    this.boardService.db = this.db;
    this.boardService.vm = this;
  }
}).$mount("#app");
