import firebase from "firebase";
import {CardInfo} from "../model/CardInfo";
export class BoardService{

    constructor(db) {
        if (!db) this.db = firebase.firestone();
        this.currentBoardRef = null;
        this.db = db;
        this.utils = null;
        this.currentBoardSubcriptions = [];
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
        this.currentBoardSubcriptions.push( this.db.collection('boards_v2').doc(id)
                .onSnapshot((doc) => {
                    console.log("BOARD CHANGEEEED", doc);
            })
        );

        this.currentBoardSubcriptions.push( this.db.collection('boards_v2').doc(id).collection('lists')
                .onSnapshot((doc) => {
                    console.log("LISTS CHANGEEEED", doc.docChanges(), doc.docs);
                    doc.docChanges().forEach( d => console.log('[DOC CHANGED] ' + d.doc.id + ' - ' , d.doc.data()))
            })
        );

        console.log('returning', board);
        return board;
    }

    close(){
        if(this.currentBoardSubcriptions) {
            this.currentBoardSubcriptions.forEach( sub => {
                sub();
            });
        }
        this.currentBoardSubcriptions = [];
    }

    updateBoard(b){
        this.db.collection('boards_v2').doc(b.id).update(b) 
        .then( res => console.log('upadate board ', b.id))
        .catch ( err => console.log('error updating board ', b.id, err));
    }

    /**
     * Delete a board from user boards and set a board flag deleted to true. It then will notify all users with the board open
     * and redirect them to a the boards list with the message that the board is deleted and at the same time it will be deleted
     * from their list of boards.
     * It is a logical delete. The real delete will happen with a server batch (???)
     * Server side control all the board with flag deletede and delete them.
     * @param {*} boardId 
     * @param {*} boards 
     * @param {*} uid 
     */
    async deleteBoard(boardId, boards, uid){
        let index = boards.findIndex( b => b.id == boardId );
        await this.db.collection('boards_v2').doc(boardId).set({deleted: true})
            .then( async b => {
                let toDelete = {id: boards[index].id, title: boards[index].title};
                await this.db.collection('users').doc(uid.trim()).update({
                    "boards": firebase.firestore.FieldValue.arrayRemove(toDelete)
                })
                    .then(res => boards.splice(index, 1))
                    .catch(err => console.log('error updating user boards ', err));
            });
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
                this.db.collection('boards_v2').doc(boardId).collection('cardsInfo').doc(''+listId+card.id).get()
                .then( v2 => {
                    card.cardInfo = v2.ref;
                    this.db.collection('boards_v2').doc(boardId).collection('lists').doc(listId+'').collection('cards').doc(card.id+'').set(card);
                })
            }
        );        
    }

    addListToBoard(board, list){
        //TODO USE firebase.firestore.FieldValue.arrayUnion
        //board.lists.push(list);
        const lists = board.lists;
        this.db.collection('boards_v2').doc(board.id).update({lists}).then(
            b => {
                this.db.collection('boards_v2').doc(board.id).collection('lists').doc((lists.length-1)+'').set({});
            });
    } 

    getBoardLists(id, uid){
        this.db.collection('boards').doc(uid.trim()).collection('boards').doc(id).collection('cards').get()
            .then(lists => console.log("cards", lists))
    }

    async retrieveCardsOfList(boardId, listId){
        return this.db.collection('boards_v2').doc(boardId).collection('lists').doc(listId+'').collection('cards').get()
    }

    upadateCardText(boardId, card, list){
        this.db.collection('boards_v2').doc(boardId).collection('lists').doc(list.id+'').collection('cards').doc(card.id+'').update({text: card.text});
    }

    updateCardLabels(boardId, card, list){
        const labels = card.labels.map( l => l.id );
        this.db.collection('boards_v2').doc(boardId).collection('lists').doc(list.id+'').collection('cards').doc(card.id+'').update({labels});
    }

    updateBoardLabels(boardId, labels){
        console.log("UPDATE BOARD LABELS");
        this.db.collection('boards_v2').doc(boardId).update({labels});
    }

    /* spostaCards(board, list, cards, uid){
        cards.forEach( card => {
            this.addCardToList(list.id, card, board, uid, list)  
        });
    } */

    /*
    -to take all cards of a list 
        /boards/KpvCvc53laUBqlRzxAjDebAXNdW2/boards/9fcd6062-7b7a-44f6-9f8d-2d78e3febd83/cards/0/cards
    -Now lists have no cards into, only the info of the list
    -Cards can be pointed individually direcly, to update text or labels, or delete them
    -Cards info are still pointable individually and directly on demand (to retrieve and to update!).
    */


}