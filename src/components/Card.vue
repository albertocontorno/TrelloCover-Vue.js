<template>
<div class="card-container"
    v-on:mouseenter="mouseEnter()"
    v-on:mouseleave="mouseLeave()"
>
    <div class="card-body" v-on:click="openAdvancedEdit()">
        <div class="card-labels">
            <Label v-for="(label, index) in iCard.labels" v-bind:key="index" v-bind:text="label.text" v-bind:color="label.color"/>
        </div>
        <div v-show="showOptionsButton" class="card-options" v-on:click="editCard($event)">
            <font-awesome-icon icon="pen"/>
        </div>
        <div class="card-text">{{iCard.text}}</div>
        <div class="card-footer"></div>
        <CardEdit v-if="showEdit"  v-bind:iText="iCard.text" v-bind:iLabels="iCard.labels"
            @close-edit="closeEdit()" 
            @update-text="updateText($event)"
            @select-label="onSelectLabel($event)"
        />
    </div>
</div>
</template>


<script>
import Label from './Label';
import CardEdit from './CardEdit';
import {ModalController} from '../js/modalController.js';
var nextId = 0;

export default {
    name: "Card",
    props: ['iCard', 'index'],
    components:{
        Label,
        CardEdit
    },
    inject: ['labelsService'],
    mounted: function(){
        this.labels = this.iCard.labels;
        this.modal = ModalController.getInstance();
        this.labelsSubscriptions.push(this.labelsService.labels.subscribe(this.setupCardLabels));
        this.labelsSubscriptions.push(this.labelsService.eventDispatcher.subscribe( 'delete-label', this.onDeleteLabel ));
    },
    beforeDestroy(){
        if(this.labelsSubscriptions){ this.labelsSubscriptions.forEach( sub => sub.unsubscribe()); } 
    },
    data: function(){
        return {
            showOptionsButton: false,
            showEdit: false,
            id: 'card-' + nextId++,
            labels: [],
            showAdvancedOption: false,
            modal: null,
            labelsSubscriptions: [],
        }
    },
    methods: {
        mouseEnter: function(){
            this.showOptionsButton = true;
        },
        mouseLeave: function(){
            this.showOptionsButton = false;
        },
        editCard: function($event){
            this.showOptionsButton =false;
            this.showEdit = true;
            $event.stopPropagation();
        },
        closeEdit(){
            this.showEdit = false;
        },
        updateText($event){
            this.iCard.text = $event;
            this.$emit('save-board');
        },
        openAdvancedEdit(){
            //this.showAdvancedOption = true;
            this.modal.open();
        },
        onSelectLabel(label){
            const index = this.labels.findIndex( l => l.id === label.id);
            if(index >= 0){
                this.labels.splice(index, 1);
            } else {
                this.labels.push(label); 
            }
            this.$emit('save-board');
        },
        onDeleteLabel(label){
            const index = this.labels.findIndex( l => l.id === label.id);
            if(index >= 0){
                this.labels.splice(index, 1);
            }
        },
        setupCardLabels(){
            console.log("SETUPPING LABELS")
            if(this.labelsService.labels.values){
                let labelsMap = {};
                this.labels.forEach( l => {
                    labelsMap[l.id] = l;
                })
                this.labels = [];
                this.labelsService.labels.values.forEach( label => {
                    if(labelsMap[label.id]){
                        this.labels.push(label);
                    }
                })
                this.iCard.labels = this.labels;
                console.log(this.labels);
            }
        }

    }
}
</script>


<style scoped>
.card-container{
    min-height: 50px;
    /*border: 1px solid black;*/
    background-color: rgb(255, 255, 255);
    display: block;
    margin: 5px auto;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
}

.card-body{
    padding: 3px 6px;
    min-height: 50px;
    display: block;
    word-break: break-word;
}

.card-container:hover{
    background-color: rgb(240, 240, 240);
}

.card-labels{
    margin: 1px 0px 2px 0px;
}

.card-text{
    color: black;
    font-family: monospace;
    font-size: 110%;
}

.card-options{
    /* background-color: #f5f5f563; */
    position: absolute;
    top: 3px;
    right: 3px;
    color: black;
    border-radius: 3px;
    font-size: 13px;
    padding:2px;
    color: rgb(116, 115, 115);
}

.card-options:hover{
    background-color: #ffffff;
    color: rgb(59, 59, 59);
    /* background-color: #c7c7c7c9; */
}

.card-footer{

}
</style>