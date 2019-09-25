<template>
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
        <Modal/>
    </div>
</template>

<script>
import CardsContainer from '../components/CardsContainer'
import AddNewContainer from '../components/AddNewContainer';
import Modal from "../components/Modal";
import { LabelService } from  '../js/services/labels.service';
export default {
    name: 'Board',
    components: {
        CardsContainer,
        AddNewContainer,
        Modal
    },
    provide: function() {
        return {
            labelsService: this.labelsService
        }
    },
    inject: ['boardService', 'authService'],
    data(){
        return {
            cardsContainers: [],
            labelsService: new LabelService(this.boardService.db, this.boardService.vm),
            labels: [],
            board: null
        }
    },
    methods:{
        onAddCard(data){
            console.log("ADD CARD: ", data);
            let container = this.cardsContainers[data.container];
            let newCard = {
                id: container.cards.length,
                labels: [],
                text: data.text
            };
            container.cards.push(newCard);
            //this.boardService.updateBoard({lists:this.board.lists, id: this.board.id}, this.authService.user.info.uid);
            this.boardService.addCardToList(
                data.container, 
                newCard,
                this.board,
                this.authService.user.info.uid,
                container
            );
        },
        onSaveCard(data){
            console.log("UPDATE CARD", data);
            this.boardService.upadateCardText(this.board.id, data.card, data.list);
        },
        onSaveCardLabels(data){
            this.boardService.updateCardLabels(this.board.id, data.card, data.list);
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
            //this.boardService.updateBoard(this.board, this.authService.user.info.uid);
        },
        async retrieveCards(boardId, lists){
            console.log("LISTE ", lists);
            lists.forEach( async list => {
                list.cards = [];
                let cards = await this.boardService.retrieveCardsOfList(boardId, list.id)
                console.log("bhooooo", cards);
                cards.forEach( c =>{
                    list.cards.push(c.data());   
                });
                this.boardService.currentBoardSubcriptions.push( cards.query.onSnapshot( l => {
                    console.log("CARDS SNAPSHOT", l, l.docs.lengt, l.docChanges())
                    l.docChanges().forEach( c =>{
                         console.log("SINGLE CARD SNAP", c, c.doc, c.doc.data())
                         const changedCard = c.doc.data();
                         if(!this.board.lists[changedCard.listId]){
                             this.board.lists[changedCard.listId] = {cards: []};
                         }
                         this.board.lists[changedCard.listId].cards[changedCard.id].text = changedCard.text;
                         const newLabels = this.labelsService.transformCardLabels(changedCard.labels);
                         this.board.lists[changedCard.listId].cards[changedCard.id].labels = newLabels;
                    });
                }));
               
            });
            return lists;
        }
    },
    mounted(){
        //TODO RENDERE SYNCH DATI E DB!
        let id = this.$route.params.id;
        console.log("open ", id);
        this.boardService.readBoard(id, this.authService.user.info.uid).then( async b => {
            if(b){
                this.board = {
                    id: b.id,
                    lists: await this.retrieveCards(b.id, b.lists),
                    labels: b.labels,
                    members: b.members
                };
                //this.$router.push('/board/'+id);
                this.cardsContainers = b.lists;
                this.labelsService.labels.values = b.labels;
                this.labelsService.update();
                this.labels = b.labels;
                this.labelsService.labels.subscribe( labels => this.boardService.updateBoardLabels(this.board.id, labels) );
            }
        });
        
        //TODO QUANDO CARICO LE CARD DEVO TRASFORMARE LE LABELS IN QUELLE REALI.
/*         this.cardsContainers = [
            {   
                id: 0,
                title: 'Title test 1',
                cards: [
                    {
                        id: 12312,
                        labels: [{text: 'label1', color: 'red'}],
                        text: 'Lorem ipsum dolo sitLorem ipsum dolor sit amet.'
                    },
                    {   
                        id: 12332,
                        labels: [],
                        text: 'Et harum quidem rerum facilis est et expedita distinctio.'
                    }
                ]
            },


            {
                id: 1,
                title: 'Title test 2',
                cards: [
                    {
                        id: 12593,
                        labels: [{text: 'label1', color: 'blue'}],
                        text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
                    },
                    {   
                        id: 12380,
                        labels: [],
                        text: 'Phasellus ac magna aliquam, sollicitudin orci a, vulputate arcu.'
                    },
                    {
                        id: null,
                        placeholder: true,
                        style: { height: '40px' }
                    }
                ]
            },


            {
                id: 2,
                title: 'Title test 3',
                cards: [
                    {   
                        id: 13352,
                        labels: [{text: 'label1', color: 'yellow'},{text: 'label2', color: 'red'}],
                        text: 'Et harum quidem rerum facilis est et expedita distinctio.'
                    }
                ]
            },

            {
                id: null,
                placeholder: true,
                style: {height: '250px', backgroundColor: '#ccc'}
            }
        ] */
    },
    beforeDestroy(){
        this.boardService.close();
    }
}
</script>

<style scoped>
.board{
  display: flex;
  overflow-x: auto;
  /* flex-grow: 1; */
  flex-direction: row;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>


