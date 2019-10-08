<template>
    <div>
        <div class="row">
            <div class="col-xs-12">
                <span v-if="!editingTitle" @click="editTitle()" class="title">{{ICheckList.title}}</span>
                <template v-if="editingTitle">
                    <Input  iAutofocus="true" v-model="newTitle" style="width: auto; display: inline-block; margin-left: 10px"/>
                    <Button label="Save" classes="success" @click="onEditTitle()"/>
                    <font-awesome-icon icon="times" class="new-item-close" @click="onCloseEditTitle()"/>
                </template>
                <Button label="Delete" classes="light-gray sm margin-t-5 float-right" @click="onDelete()"><font-awesome-icon class="icon-right" icon="times"/></Button>
            </div>
        </div>
        <ProgressBar :iValue="progressValue" :iEndLabel="progressValue"/>
        <div class="row" v-for="(item, index) of ICheckList.items" :key="index">
            <div class="col-xs">
                <font-awesome-icon 
                    class="clickable"
                    :icon="(item.item.done ? 'check-square' : 'square')" 
                    @click="toggleCheck(index)"/> 
                    <span v-if="!item.editing" class="item-text"  @click="editItem(index)">{{item.item.text}}</span>
                    <template v-if="item.editing">
                        <Input  iAutofocus="true" v-model="newText" style="width: auto; display: inline-block; margin-left: 10px"/>
                        <Button label="Save" classes="success" @click="onEditItem(index)"/>
                        <font-awesome-icon icon="times" class="new-item-close" @click="onCloseEditItem(index)"/>
                    </template>
            </div>
        </div>

         <div class="row">
            <div class="col-xs">
                <template v-if="showAddNewItem">
                    <AutoresizeTextarea class="modal-comment" v-model="newItemText"/>
                    <Button label="Add" classes="success" @click="onSaveItem()"/>
                    <font-awesome-icon icon="times" class="new-item-close" @click="onCloseAddNewItem()"/>
                </template>
                <template v-if="!showAddNewItem">
                    <Button label="Add Item" classes="light-gray sm" @click="onAddItem()"><font-awesome-icon class="icon-right" icon="plus"/></Button>
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
    props: ['ICheckList'],
    data(){
        return {
            showAddNewItem: false,
            editingTitle: false,
            newTitle: null,
            newText: null,
            newItemText: null,
        }
    },
    computed:{
        progressValue: function(){
            if(this.ICheckList.items.length <= 0){ return '0%'; }
            let doneCounter = this.ICheckList.items.filter( item => item.item.done );
            return Math.round((doneCounter.length / this.ICheckList.items.length)*100) + '%';
        }
    },
    mounted(){
    },
    methods: {
        onAddItem(){
            this.showAddNewItem = true;
        },
        onCloseAddNewItem(){
            this.showAddNewItem = false;
            this.newItemText = null;
        },
        onSaveItem(){
            let newItem = {item:{text: this.newItemText, done: false}, editing: false};
            this.ICheckList.items.push(newItem);
            this.newItemText = '';
            this.showAddNewItem = false;
            this.onSaveCheckList();
        },
        toggleCheck(index){
            if(this.ICheckList.items[index]){
                let item = this.ICheckList.items[index];
                item.item.done = !item.item.done;
                this.onSaveCheckList();
            }
        },
        editItem(index){
            this.ICheckList.items.forEach( item => item.editing = false );
            if(this.ICheckList.items[index]){
                this.newText = this.ICheckList.items[index].item.text;
                this.ICheckList.items[index].editing = true;
            }
        },
        onEditItem(index){
            if(this.ICheckList.items[index]){
                this.ICheckList.items[index].editing = false;
                this.ICheckList.items[index].item.text = this.newText;
                this.onSaveCheckList();
            }
        },
        onCloseEditItem(index){
            if(this.ICheckList.items[index]){
                this.ICheckList.items[index].editing = false;
            }
        },
        editTitle(){
            this.newTitle = this.ICheckList.title;
            this.editingTitle = true;
        },
        onCloseEditTitle(){
            this.editingTitle = false;
        },
        onEditTitle(){
            this.ICheckList.title = this.newTitle;
            this.newTitle = null;
            this.editingTitle = false;
            this.onSaveCheckList();
        },
        onSaveCheckList(){
            this.$emit('save-checkList');
        },
        onDelete(){
            this.$emit('delete-checkList');
        }
    }
}
</script>

<style scoped>
.col-xs-12, .col-xs{
    padding: 0;
}

.title{
    cursor: pointer;
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
