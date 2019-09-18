<template>
    <div>
        <div class="row">
            <div class="col-xs-12">
                <font-awesome-icon icon="check-square"/> {{iTitle}}
                <button class="modal-body-button margin-t--5"><font-awesome-icon class="icon-right" icon="times"/>Delete</button>
            </div>
        </div>
        <ProgressBar :iValue="progressValue" :iEndLabel="progressValue"/>
        <div class="row" v-for="(item, index) of items" :key="index">
            <div class="col-xs">
                <font-awesome-icon 
                    class="clickable"
                    :icon="(item.item.done ? 'check-square' : 'square')" 
                    @click="toggleCheck(index)"/> 
                    <span v-if="!item.editing" class="item-text"  @click="editItem(index)">{{item.item.text}}</span>
                    <template v-if="item.editing">
                        <Input  iAutofocus="true" v-model="item.item.text" style="width: auto; display: inline-block; margin-left: 10px"/>
                        <Button label="Save" classes="success" @click="onEditItem(index)"/>
                        <font-awesome-icon icon="times" class="new-item-close" @click="onCloseEditItem(index)"/>
                    </template>
            </div>
        </div>

         <div class="row">
            <div class="col-xs">
                <template v-if="showAddNewItem">
                    <AutoresizeTextarea class="modal-comment" v-model="newItemText"/>
                    <Button label="Save" classes="success" @click="onSaveItem()"/>
                    <font-awesome-icon icon="times" class="new-item-close" @click="showAddNewItem=false"/>
                </template>
                <template v-if="!showAddNewItem">
                    <button class="modal-body-button float-left margin-tb-5" @click="onAddItem()"><font-awesome-icon class="icon-right" icon="plus"/>Add Item</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressBar from './ProgressBar';
import Button from './Button';
import AutoresizeTextarea from './AutoresizeTextarea';
import Input from './Input';
export default {
    name: 'checklist',
    components: {
        ProgressBar,
        Button,
        AutoresizeTextarea,
        Input
    },
    props: ['iItems', 'iTitle'],
    data(){
        return {
            showAddNewItem: false,
            newItemText: null,
            items: [],
            progressValue: '0%'
        }
    },
    mounted(){
        this.iItems.forEach( item => {
            this.items.push({item, editing: false});
        });
        this.calculatePercentage();
    },
    methods: {
        onAddItem(){
            this.showAddNewItem = true;
        },
        onSaveItem(){
            let newItem = {item:{text: this.newItemText, done: false}, editing: false};
            this.items.push(newItem);
            this.$emit('addItemChecklist', newItem);
            this.newItemText = '';
            this.showAddNewItem = false;
            this.calculatePercentage();
        },
        toggleCheck(index){
            if(this.items[index]){
                this.items[index].item.done = !this.items[index].item.done;
                this.calculatePercentage();
            }
        },
        editItem(index){
            this.items.forEach( item => item.editing = false );
            if(this.items[index]){
                this.items[index].editing = true;
            }
        },
        onEditItem(index){
            if(this.items[index]){
                this.items[index].editing = false;
            }
        },
        onCloseEditItem(index){
            if(this.items[index]){
                this.items[index].editing = false;
            }
        },
        calculatePercentage(){
            let doneCounter = this.items.filter( item => item.item.done );
            this.progressValue = Math.round((doneCounter.length / this.items.length)*100) + '%';
        }
    }
}
</script>

<style scoped>
.col-xs-12, .col-xs{
    padding: 0;
}

.modal-body-button{
    background: #e3e3e3;
    border: 0;
    border-bottom: 1px solid gray; 
    padding: 3px 5px;
    border-radius: 3px;
    outline: none;
    float: right;
}

.modal-body-button:hover{
    background: lightgray;
    cursor: pointer;
    outline: none;
}

.modal-comment{
    background-color: whitesmoke;
    border: 1px solid lightgray;
    min-height: 35px;
    font-size: 14px;
    font-weight: 400;
}

.new-item-close{
    margin-left: 10px;
    position: relative;
    top: 5px;
    left: 5px;
    font-size: 21px;
    cursor: pointer;
}

.item-text{
    font-weight: 400;
    margin-left: 5px;
}

</style>
