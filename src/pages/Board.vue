<template>
    <div class="board">
        <CardsContainer v-for="(container, index) in cardsContainers" :key="container.id" :iContainer="container" :index="index"
            @addCard="onAddCard($event)"
            @save-board="onSaveBoard()"
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
        onAddNewList(name){
            this.cardsContainers.push(
                {
                    id: this.cardsContainers.length,
                    title: name,
                    cards: []
                }
            );
            this.boardService.updateBoard(this.board.lists, this.authService.user.info.uid);
        },
        onSaveBoard(){
            //this.boardService.updateBoard(this.board, this.authService.user.info.uid);
        },
        retrieveCards(boardId, lists){
            lists.forEach( list => {
                this.boardService.retrieveCardsOfList(boardId, list.id)
            });
        }
    },
    mounted(){
        //TODO RENDERE SYNCH DATI E DB!
        let id = this.$route.params.id;
        console.log("open ", id);
        this.boardService.readBoard(id, this.authService.user.info.uid).then( b => {
            if(b){
                this.board = {
                    id: b.id,
                    lists: this.retrieveCards(b.id, b.lists),
                    labels: b.labels,
                    members: b.members
                };
                //this.$router.push('/board/'+id);
                this.cardsContainers = b.lists;
                this.labelsService.labels.values = b.labels;
                this.labelsService.update();
                this.labels = b.labels;
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


