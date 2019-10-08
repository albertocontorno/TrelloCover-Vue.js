<template>
    <div class="card-option-add-checkList" ref="modalBody">
        <div class="card-option-add-checkList-header">
            <!-- <span v-if="addLabel || modifyLabel" class="back-arrow" @click="onClose()"><font-awesome-icon icon="arrow-left"/></span> -->
            <h4>Add CheckList</h4>
            <span class="card-option-add-checkList-header-close" v-on:click="onClose()"><font-awesome-icon icon="times"/></span>
        </div>
        <div class="card-option-add-checkList-body" :style="bodyStyle">
            <template>
                Title
                <Input v-model="checkListTitle" iAutofocus="true"/>
                <div>
                    <Button :label="'Save'" classes="success" class="margin-tbr-5" @click="onAddList()" :disabled="(checkListTitle == '')"/>
                    <font-awesome-icon icon="times" class="close" @click="onClose()"/>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Button from './Button';
import Input from './Input';
import { CheckList } from '../js/model/CheckList';

export default {
    name: 'AddCheckList',
    components: {
        Input,
        Button
    },
    data(){
        return {
            bodyStyle: null,
            onResizeSubscription: null,
            checkListTitle: ''
        }
    },
    methods: {
        onResize: function(){
            var rect = this.$refs['modalBody'].getBoundingClientRect();
            let style = {maxHeight: (window.innerHeight - rect.top - 55) + 'px'};
            this.bodyStyle = style;
        },
        onClose(){
            this.checkListTitle = '';
            this.$emit('close-add-checklist');
        },
        onAddList(){
            let newCheckList = new CheckList(this.checkListTitle);
            this.$emit('add-checkList', newCheckList);
            this.onClose();
        }
    },
    mounted(){
        this.onResizeSubscription = true;
        this.onResize();
        window.addEventListener('resize', this.onResize);
    },
}
</script>
    

<style scoped>

.close{
    margin-left: 10px;
    position: relative;
    top: 5px;
    left: 5px;
    font-size: 21px;
    cursor: pointer;
}

.card-option-add-checkList{
    position: absolute;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 1px 3px 0px #000000cc;
    width: 100%;
    padding-bottom: 5px;
    z-index: 50;
}

.card-option-add-checkList-header{
    border-bottom: 1px solid #ccc;
    padding: 5px;
    text-align: center;
}

.card-option-add-checkList-header h4{
    display: inline-block;
    margin: 3px 0px;
}

.card-option-add-checkList-header-close{
    float: right;
    padding: 5px;
    margin-right: 2px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}

.card-option-add-checkList-body{
    padding: 3px 8px;
    overflow-y: auto;
}
</style>
