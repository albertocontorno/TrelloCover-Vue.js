import firebase from "firebase";
import {CardInfo} from "../model/CardInfo";
export class BoardService{

    constructor(db) {
        if (!db) this.db = firebase.firestone();
        this.currentBoardRef = null;
        this.db = db;
        this.utils = null;
    }

    async createBoard(nb, uid){
        await this.db.collection('boards_v2').doc(nb.id).get()
            .then( async b => {
                if(!b.exists){ //non c'è una board con quell'id
                    await this.db.collection('boards_v2').doc(nb.id).set(Object.assign({}, nb))//salvo la nuova board
                        .then( async s => {
                            //AGGIUNGERE ALLE BOARDS DEL CLIENTE CON FUNCTION FIREBASE
                            await this.db.collection('users').doc(uid.trim()).update({
                                "boards": firebase.firestore.FieldValue.arrayUnion({ id: nb.id, title: nb.title })
                            })
                                .then(res => console.log('upadate user boards'))
                                .catch(err => console.log('error updating user boards ', err));
                        });
                } else {
                    //Bho create other uid and retry ???
                    nb.id = this.utils.uuidv4();
                    this.createBoard(nb, uid);
                }
            });
    }

    async readBoard(id){
        let board;
        await this.db.collection('boards_v2').doc(id).get().then( b => {
            this.currentBoardRef = b;
            board = b.data();
        });
        //TODO TO REMOVE FROM HERE AND MANAGE PROPERLY
        this.db.collection('boards_v2').doc(id)
            .onSnapshot((doc) => {
                console.log("BOARD CHANGEEEED", doc);
        });
        console.log('returning', board);
        return board;
    }

    updateBoard(b){
        this.db.collection('boards_v2').doc(b.id).update(b)
        .then( res => console.log('upadate board ', b.id))
        .catch ( err => console.log('error updating board ', b.id, err));
    }

    addCardToList(listId, card, board, uid, list){
        //if(true){ return; }
        console.log(listId, card, board.id, uid, list)
        let cardInfoObj = new CardInfo();
        cardInfoObj.activities.push({date: firebase.firestore.Timestamp.fromDate(new Date()), description: 'Card Created', user: uid});
        cardInfoObj.listId = listId;
        cardInfoObj.listTitle = list.title;
        cardInfoObj.members.push(...board.members);
        cardInfoObj.id = ''+listId+card.id;
        cardInfoObj = JSON.parse(JSON.stringify(cardInfoObj));

        let boardId = board.id;
        this.db.collection('boards_v2').doc(boardId).collection('cardsInfo').doc(''+listId+card.id).set(cardInfoObj).then(
            v => {
                this.db.collection('boards').doc(uid.trim()).collection('boards').doc(boardId).collection('cardsInfo').doc(''+listId+card.id).get()
                .then( v2 => {
                    console.log(v2.ref);
                    //card.cardInfo = v2.ref;
                    this.db.collection('boards_v2').doc(boardId).collection('lists').doc(listId+'').collection('cards').doc(card.id+'').set(card);
                })
            }
        );        
    }

    addListToBoard(board, list){
        board.lists.push(list);
        const lists = board.lists;
        this.db.collection('boards_v2').doc(board.id).update({lists}).then(
            b => {
                this.db.collection('boards_v2').doc(board.id).collection('lists').doc(lists.length-1).set({});
            });
    }

    deleteBoard(id){

    }

    getBoardLists(id, uid){
        this.db.collection('boards').doc(uid.trim()).collection('boards').doc(id).collection('cards').get()
            .then(lists => console.log("cards", lists))
    }

    async retrieveCardsOfList(boardId, listId){
        console.log("RETRIEVING CARDS");
        await this.db.collection('boards_v2').doc(boardId).collection('lists').doc(listId+'').collection('cards').get().then( cards =>{
            console.log("CARDS RETRIEVED",  cards);
        });
    }

    /*
    -to take all cards of a list 
        /boards/KpvCvc53laUBqlRzxAjDebAXNdW2/boards/9fcd6062-7b7a-44f6-9f8d-2d78e3febd83/cards/0/cards
    -Now lists have no cards into, only the info of the list
    -Cards can be pointed individually direcly, to update text or labels, or delete them
    -Cards info are still pointable individually and directly on demand (to retrieve and to update!).
    */


}