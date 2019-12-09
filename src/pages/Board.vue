<template>
    <span>
    <div class="board-nav"><BoardNav :iBoard="board"/></div>
    <div class="board">
        <CardsContainer v-for="(container, index) in cardsContainers" :key="container.id" :iContainer="container" :index="index"
            @addCard="onAddCard($event)"
            @save-board="onSaveBoard()"
            @save-card="onSaveCard($event)"
            @save-card-labels="onSaveCardLabels($event)"
        />
        <div>
            <AddNewContainer @add-list="onAddNewList($event)"/>
        </div>
        <Modal
            :iUser="authService.user"
            @save-description="onSaveDescription($event)"
            @label-selected-modal="onLabelSelectedFromModal($event)"
            @save-card-labels="onSaveCardLabels($event)"
            @add-checkList="onAddCheckList($event)"
            @save-checkList="onSaveCheckList($event)"
            @add-comment="onAddComment($event)"
            @save-comments="onSaveComments($event)"
            @delete-comment="onDeleteComment($event)"
        />
    </div>
    </span>
</template>

<script>
import CardsContainer from '../components/CardsContainer'
import AddNewContainer from '../components/AddNewContainer';
import Modal from '../components/Modal';
import BoardNav from '../components/BoardNav';
import { LabelService } from  '../js/services/labels.service';
import { CardService } from '../js/services/card.service';
import { UsersService } from '../js/services/users.service';

export default {
    name: 'Board',
    components: {
        BoardNav,
        CardsContainer,
        AddNewContainer,
        Modal
    },
    provide: function() {
        return {
            labelsService: this.labelsService,
            cardService: this.cardService,
            usersService: this.usersService
        }
    },
    inject: ['boardService', 'authService', 'utilsService'],
    data(){
        return {
            cardsContainers: [],
            labelsService: new LabelService(this.boardService.db, this.boardService.vm),
            cardService: new CardService(this.boardService.db, this.utilsService),
            usersService: new UsersService(this.boardService.db, this.boardService.db2),
            labels: [],
            board: null
        }
    },
    methods:{
        onAddCard(data){
            let container = this.cardsContainers[data.container];
            let newCard = {
                id: container.cards.length,
                labels: [],
                text: data.text
            };
            container.cards.push(newCard);
            this.boardService.addCardToList(
                data.container, 
                newCard,
                this.board,
                this.authService.user.info.uid,
                container
            );
        },
        onSaveCard(data){
            this.boardService.upadateCardText(this.board.id, data.card, data.list);
        },
        onSaveCardLabels(data){
            this.boardService.updateCardLabels(this.board.id, data.card, data.list.id);
        },
        onAddNewList(name){
            let newList = {
                    id: this.cardsContainers.length,
                    title: name,
                    cards: []
                };
            this.cardsContainers.push( newList );//SPOSTA IN SERVIZIO SE TUTTO VA BENE?
            this.boardService.addListToBoard(this.board, newList);
        },
        onSaveBoard(){
            console.log('Save board');
        },
        addListListener(cards){
            this.boardService.currentBoardSubcriptions.push( cards.query.onSnapshot( l => {
                l.docChanges().forEach( c =>{
                        const changedCard = c.doc.data();
                        if(!this.board.lists[changedCard.listId]){
                            this.board.lists[changedCard.listId] = {cards: []};
                        }
                        if(!this.board.lists[changedCard.listId].cards[changedCard.id]){
                            this.$set(this.board.lists[changedCard.listId].cards, changedCard.id, changedCard);
                        } else {
                            this.board.lists[changedCard.listId].cards[changedCard.id].text = changedCard.text;
                            const newLabels = this.labelsService.transformCardLabels(changedCard.labels);
                            this.board.lists[changedCard.listId].cards[changedCard.id].labels = newLabels;
                        }
                });
            }));
        },
        async retrieveCards(boardId, lists){
            lists.forEach( async list => {
                list.cards = [];
                let cards = await this.boardService.retrieveCardsOfList(boardId, list.id)
                cards.forEach( c =>{
                    list.cards.push(c.data());   
                });
                this.addListListener(cards);
            });
            return lists;
        },
        onSaveDescription({data: cardInfo, detail}){
            this.boardService.saveCardInfo(this.board.id, cardInfo, {description: detail});
        },
        onLabelSelectedFromModal(){
            
        },
        onAddCheckList({checkList, cardInfo}){
            checkList.id = this.utilsService.uuidv4();
            cardInfo.checkLists.push(Object.assign({}, checkList));
            this.cardService.saveCardCheckLists(this.board.id, cardInfo.id, cardInfo.checkLists);  
        },
        onSaveCheckList(cardInfo){
            this.cardService.saveCardCheckLists(this.board.id, cardInfo.id, cardInfo.checkLists);
        },
        onAddComment(data){
             this.cardService.addCardComment(this.board.id, data.cardInfo.id, data.cardInfo.comments, data.newComment);
        },
        onSaveComments(cardInfo){
            this.cardService.saveCardComments(this.board.id, cardInfo.id, cardInfo.comments);
        },
        onDeleteComment(data){
            this.cardService.deleteCardComment(this.board.id, data.cardInfo.id, data.cardInfo.comments, data.index)
        }
    },
    mounted(){
        //TODO RENDERE SYNCH DATI E DB!
        let id = this.$route.params.id;

        this.usersService.getUsers()

        this.boardService.readBoard(id, this.authService.user.info.uid).then( async b => {
            if(b){
                this.board = {
                    id: b.id,
                    lists: await this.retrieveCards(b.id, b.lists),
                    labels: b.labels,
                    members: b.members,
                    title: b.title
                };

                this.boardService.currentBoardSubcriptions.push(
                    this.boardService.currentBoardRef.ref.onSnapshot((doc) => {
                        //Labels
                        this.labelsService.labels.values = doc.data().labels;
                        this.labelsService.update();
                        //lists //TODO gestire delete
                        let newLists = doc.data().lists;
                        let listMap = {};
                        this.board.lists.forEach( l => listMap[l.id] = l );
                        let newListMap = {};
                        newLists.forEach( async l => { //Manage the added listsd
                            newListMap[l.id] = l;
                            if(listMap[l.id]){
                                //Already exists
                                listMap[l.id].title = l.title;
                            } else { //Added one
                                this.cardsContainers.push( l );
                                let cards = await this.boardService.retrieveCardsOfList( this.board.id, l.id);
                                this.addListListener(cards);
                            }
                        });
                        this.board.lists.forEach( (l, index) => {
                            if(!newListMap[l.id]){
                                this.board.lists.splice(index, 1);
                            }
                        });
                        //New/Deleted Card
                    })
                );
                
                this.cardsContainers = b.lists;
                this.labelsService.labels.values = b.labels;
                this.labelsService.update();
                this.labels = b.labels;
                this.labelsService.labels.subscribe( labels => this.boardService.updateBoardLabels(this.board.id, labels) );
            }
        });
    },
    beforeDestroy(){
        this.boardService.close();
    }
}
</script>

<style scoped>
.board-nav{
    height: 40px;
}

.board{
  display: flex;
  overflow-x: auto;
  flex-direction: row;
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1976d2;
}
</style>


