import firebase from "firebase";

export class BoardService{

    constructor(db) {
        if (!db) this.db = firebase.firestone();
        this.currentBoardRef;
        this.db = db;
    }

    async createBoard(nb, uid){
        //TODO VERIFICARE SE FATTIBILE TUTTO CON UNA FUNCTION FIREBASE!
        await this.db.collection('boards').doc(uid.trim()).get()
        .then( async b => {
            console.log(b) 
            if(!b.exists){
                await this.db.collection('boards').doc(uid.trim()).set({ owner: uid })
                .then( async res => {
                    await this.db.collection('boards').doc(uid.trim()).collection('boards').doc(nb.id).set(Object.assign({}, nb))
                    .then( async s => {
                        //AGGIUNGERE ALLE BOARDS DEL CLIENTE CON FUNCTION FIREBASE
                        await this.db.collection('users').doc(uid.trim()).update({
                            "boards": firebase.firestore.FieldValue.arrayUnion({id: nb.id, title: nb.title})
                        })
                        .then( res => console.log('upadate user boards'))
                        .catch ( err => console.log('error updating user boards ', err));
                        console.log("BOARD CREATA", s);
                    })
                    .catch( e => console.log(e) );
                });
            } else {
                await this.db.collection('boards').doc(uid.trim()).collection('boards').doc(nb.id).set(Object.assign({}, nb))
                .then( async s => {
                    //TODO AGGIUNGERE ALLE BOARDS DEL CLIENTE CON FUNCTION FIREBASE
                    await this.db.collection('users').doc(uid.trim()).update({
                        "boards": firebase.firestore.FieldValue.arrayUnion({id: nb.id, title: nb.title})
                    })
                    .then( res => console.log('upadate user boards'))
                    .catch ( err => console.log('error updating user boards ', err));
                    console.log("BOARD CREATA", s);
                })
                .catch( e => console.log(e));
            }
        })
        .catch(err => {
            console.log("?????", uid, err)
        });
       /*  await this.db.collection('boards').doc(uid).collection('boards').doc(b.id).set(Object.assign({}, b)).then( s => {
            //TODO AGGIUNGERE ALLE BOARDS DEL CLIENTE
            console.log("BOARD CREATA", s);
        }) 
        .catch( err => console.log('board non creata ', err))*/
    }

    async readBoard(id, uid){
        let board;
        await this.db.collection('boards').doc(uid).collection('boards').where('id', '==', id).get().then( boards => {
            console.log(board);
            boards.forEach( b => {
                this.currentBoardRef = b;
                board = b.data();
                console.log('??????', board);
            });
        });
        //TODO TO REMOVE FROM HERE AND MANAGE PROPERLY
        this.db.collection('boards').doc('boardAdmin1').collection('boards').where('id', '==', id)
            .onSnapshot((doc) => {
                console.log("BOARD CHANGEEEED", doc.docs[0].data());
        });
        console.log('returning', board);
        return board;
    }

    updateBoard(b, uid){
        this.db.collection('boards').doc(uid.trim()).collection('boards').doc(b.id).update(b)
        .then( res => console.log('upadate board ', b.id))
        .catch ( err => console.log('error updating board ', b.id, err));
    }

    deleteBoard(id){

    }


}