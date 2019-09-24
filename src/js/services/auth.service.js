import firebase from "firebase";
import Vue from "vue";

/**
{
  "rules": {
    "users": {
      "$user_id": {
        ".write": "$user_id === auth.uid"
      }
    }
  }
} */

export class AuthService{
    constructor(db){
        this.user = null;
        if(!db) this.db = firebase.firestone();
        this.db = db;
    }

    signup(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            (user) => {
                this.user = user;
                console.log("Signed Up!", user);
            },
            (err) => {
                console.error(err);
            }
        )
    }

    login(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then( async user => {
                this.user = user;
                this.user.info = {};
                await this.retrieveUserInfo(user.user.uid);
                return new Promise( (resolve, reject) => {
                    resolve(true);
                });
            })
            .catch( err => {
                return new Promise( (resolve, reject) => {
                    reject(false);
                });
            });
    }

    logout(){
        console.log("LOGOUT")
        if(this.isUserLogged()){
            firebase.auth().signOut().then(
                () => this.user = null,
                (err) => console.error("error=",err)
            )
        }
    }

    getUser(){
        return this.user;
    }

    isUserLogged(){
        return this.user != null;
    }

    async retrieveUserInfo(userUID){
        console.log("RETIREVEEE");
        await this.db.collection('users').doc(userUID).get().then( u => {
            this.user.info = u.data();
            console.log(this.user.info);
        });

        /* this.db.collection("users").doc("admin")
            .onSnapshot( (doc) => {
                Object.assign(this.user.info, doc.data());
                console.log("Current data: ", this.user.info);
        }); */
    }
}