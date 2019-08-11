<template>
<div>
    <div class="container-main" v-if="!iContainer.placeholder">
        <div class="container-header">
            <h4 class="container-title">{{iContainer.title}}</h4>
            <span class="container-options" @click="optionsClicked()"><font-awesome-icon icon="ellipsis-h"/></span>
        </div>
        <div>
            <template  v-for="(card, index) of iContainer.cards">
                <Card v-if="!card.placeholder" :key="card.id" :index="index" :iCard="card"
                    @save-board="onSaveBoard()"
                />
                <div v-if="card.placeholder" :style="card.style" class="container-card-placeholder" :key="index"></div>
            </template>
            
            <div v-if="showAddCard">
                <AutoresizeTextarea v-model="newCardText" class="add-card-textarea"/>
                <div>
                    <Button label="Add" :classes="['success']" @click="addCard()"/> 
                    <span @click="closeAddCard()" class="add-close"><font-awesome-icon icon="times"/></span>
                </div>
            </div>
        </div>
        <div v-if="!showAddCard" class="container-footer" @click="openAddCard()"><font-awesome-icon icon="plus"/> Add Another Card</div>
    </div>
    <div class="container-main" v-if="iContainer.placeholder" :style="iContainer.style"></div>
</div>
</template>


<script>
import Card from "./Card";
import AutoresizeTextarea from "./AutoresizeTextarea";
import Button from './Button';

export default {
    name: 'CardsContainer',
    props: ['iContainer', 'index'],
    components:{
        Card,
        AutoresizeTextarea,
        Button
    },
    data(){
        return {
            showAddCard: false,
            newCardText: ''
        }
    },
    methods:{
        optionsClicked(){
            console.log("optionsClicked");
        },
        openAddCard(){
            this.newCardText = '';
            this.showAddCard = true;
        },
        closeAddCard(){
            this.newCardText = '';
            this.showAddCard = false;
        },
        addCard(){
            this.$emit('addCard', {container: this.index, text:this.newCardText});
            this.closeAddCard();
        },
        onSaveBoard(){
            console.log("SAVE BOAR")
            this.$emit('save-board');
        }
    }

}
</script>


<style scoped>
.container-main{
    width: 280px;
    min-height: 100px;
    /*border: 1px solid rgb(158, 158, 158);*/
    border-radius: 3px;
    background-color: #dfe1e6;
    margin: 0px 10px;
    padding: 5px;
    display: block;
    position: relative;
}

.container-header{
    position: relative;
}

.container-title{
    padding-top: 5px;
    font-weight: bold;
    margin: auto 0;
    width: calc(100% - 32px);
}

.container-options{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 13px;
    padding: 5px;
    border-radius: 3px;
}

.container-options:hover{
    background: rgb(0,0,0,0.1);
    cursor: pointer;
}

.container-footer{
    font-size: 15px;
    font-weight: bold;
    font-family: monospace;
    padding: 5px ;
    cursor: pointer;
    border-radius: 3px;
}

.container-footer:hover{
    background-color: rgba(0, 0, 0, 0.171);
}

.add-card-textarea{
    background-color: white;
    margin-right: 5px;
    display: block;
    padding: 5px;
    box-shadow: 0 0 1px 0px black;
    margin-bottom: 5px;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: inherit;
    font-family: monospace;
    font-size: 110%;
}

.add-close{
    font-size: 20px;
    top: 3px;
    left: 10px;
    position: relative;
    cursor: pointer;
}

.container-card-placeholder{ 
    background-color: #ccc;
    margin-bottom: 5px;
    border-radius: 3px;
}
</style>