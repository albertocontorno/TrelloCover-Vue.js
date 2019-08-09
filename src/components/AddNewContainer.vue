<template>
    <div class="new-list">
        <div v-if="showAddButton" @click="showAddNewList()" class="new-list-title"><font-awesome-icon icon="plus"/> Add New List</div>
        <div v-if="!showAddButton" class="new-list-input">
            <label>Title
                <div>
                    <Input v-model="value"/>
                </div>
            </label>
            <div>
                <Button label="Save" classes="success btn" @click="addList()" :disabled="value == ''"/>
                <span @click="closeAddList()" class="add-close"><font-awesome-icon icon="times"/></span>
            </div>
                
        </div>
    </div>
</template>

<script>
import Button from './Button';
import Input from './Input';

export default {
    name: 'AddNewContainer',
    components:{
        Button,
        Input
    },
    data(){
        return {
            value: '',
            showAddButton: true
        }
    },
    methods: {
        showAddNewList(){
            this.showAddButton = false;
        },
        addList(){
            if(!this.value || this.value === ''){
                return;
            }
            this.showAddButton = true;
            this.$emit("add-list", this.value.trim());
            this.value = '';
        },
        closeAddList(){
            this.value = '';
            this.showAddButton = true;
        }
    }
}
</script>

<style scoped>

.new-list{
    background-color: darkgray;
    width: 280px;
    margin: 0 10px;
    position: relative;
    border-radius: 3px;
    display: block;
    font-family: monospace;
    font-weight: bold;
    font-size: 15px;
}

.new-list-title:hover{
    background-color: #ccc;
}

.new-list-title{
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
}

.btn{
    margin: 5px 0;
}

.new-list-input{
    padding: 5px;
    border-radius: 3px;
}

.add-close{
    font-size: 20px;
    top: 3px;
    left: 10px;
    position: relative;
    cursor: pointer;
}
</style>
