import firebase from "firebase";
export class CardService{

    constructor(db, utilsService) {
        if (!db) this.db = firebase.firestone();
        this.db = db;
        this.utils = utilsService;
        this.currentBoardSubcriptions = [];
    }

    saveCardCheckLists(boardId, cardInfoId, checkLists){
        this.db.collection('boards_v2').doc(boardId).collection('cardsInfo').doc(''+cardInfoId).update({checkLists}).then(
            v => {
                console.log('CARD INFO SAVED');
            }
        );
    }

    addCardComment(boardId, cardInfoId, comments, comment){
        comment.id = this.utils.uuidv4();
        this.db.collection('boards_v2').doc(boardId).collection('cardsInfo').doc(''+cardInfoId).update({comments: firebase.firestore.FieldValue.arrayUnion(comment)}).then(
            v => {
                comments.push(comment);
            }
        );
    }

    saveCardComments(boardId, cardInfoId, comments){
        this.db.collection('boards_v2').doc(boardId).collection('cardsInfo').doc(''+cardInfoId).update({comments}).then(
            v => {
                console.log('CARD INFO SAVED');
            }
        );
    }

    deleteCardComment(boardId, cardInfoId, comments, index){
        let commentToRemove = comments.splice(index, 1);

        this.db.collection('boards_v2').doc(boardId).collection('cardsInfo').doc(''+cardInfoId).update({comments}).then(
            v => {
                console.log('CARD INFO SAVED');
            }
        )
        .catch( err => comments.splice(index, 0, commentToRemove));
    }

}