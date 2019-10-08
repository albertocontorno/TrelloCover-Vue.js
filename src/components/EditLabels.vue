<template>
    <div class="card-option-edit-labels" ref="modalBody">
        <div class="card-option-edit-labels-header">
            <span v-if="addLabel || modifyLabel" class="back-arrow" @click="onCloseAddNewLabel()"><font-awesome-icon icon="arrow-left"/></span>
            <h4>Edit Labels</h4>
            <span class="card-option-edit-labels-header-close" v-on:click="$emit('closeLabels')"><font-awesome-icon icon="times"/></span>
        </div>
        <div class="card-option-edit-labels-body" :style="bodyStyle">
            <template v-if="showLabels">
                <div v-for="(label,index) of labels" class="label" :key="label.text + index">
                    <span class="label-inner" :class="label.color" @click="selectLabel(index)">
                        {{label.text}}
                        <span v-if="iLabels.find(l=>l.id ==label.id)" class="label-inner-selected"><font-awesome-icon icon="check"/></span>
                    </span>
                    <span class="label-inner-edit" :class="label.color" @click="editLabel(index)"><font-awesome-icon icon="pen"/></span>
                </div>

                <div class="label-new" @click="onAddNewLabel($event)"><font-awesome-icon icon="plus"/> Create New Label</div>
            </template>
            <template v-if="addLabel || modifyLabel">
                <label>
                    Name
                    <Input v-model="labelName" iAutofocus="true" />
                </label>
                <div class="label-edit-color-container">
                    <div class="label-edit-color blue" :class="{'selected': (labelColor === 'blue')}"  @click="selectColor('blue')"></div>
                    <div class="label-edit-color red" :class="{'selected': (labelColor === 'red')}" @click="selectColor('red')"></div>
                    <div class="label-edit-color white" :class="{'selected': (labelColor === 'white')}" @click="selectColor('white')"></div>
                    <div class="label-edit-color orange" :class="{'selected': (labelColor === 'orange')}" @click="selectColor('orange')"></div>
                    <div class="label-edit-color green" :class="{'selected': (labelColor === 'green')}" @click="selectColor('green')"></div>
                    <div class="label-edit-color purple" :class="{'selected': (labelColor === 'purple')}" @click="selectColor('purple')"></div>
                    <div class="label-edit-color black" :class="{'selected': (labelColor === 'black')}" @click="selectColor('black')"></div>
                    <div class="label-edit-color yellow" :class="{'selected': (labelColor === 'yellow')}" @click="selectColor('yellow')"></div>
                    <div class="label-edit-color gray" :class="{'selected': (labelColor === 'gray')}" @click="selectColor('gray')"></div>
                </div>
                <div>
                    <Button :label="btnEditLabel" classes="success" class="margin-tbr-5" @click="onEditLabel()" :disabled="(labelName == '' || labelColor == '')"/>
                    <Button v-if="modifyLabel" label="Delete" classes="error" class="margin-tbr-5" @click="onDeleteLabel()"/>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";

export default {
    name: 'EditLabels',
    props: ['iLabels'],
    inject: ['labelsService'],
    components: {
        Label,
        Input,
        Button
    },
    data(){
        return {
            bodyStyle: null,
            onResizeSubscription: null,
            showLabels: true,
            labelName: '',
            labelColor: '',
            editedLabel: -1,
            modifyLabel: false,
            addLabel: false,
            btnEditLabel: '',
            labels: [],
            editedIdLabel: null,
            labelSubscription: null
        }
    },
    methods:{
        onResize: function(){
            var rect = this.$refs['modalBody'].getBoundingClientRect();
            let style = {maxHeight: (window.innerHeight - rect.top - 55) + 'px'};
            this.bodyStyle = style;
        },
        selectLabel(index){
            this.$emit('selectLabel', this.labels[index]);
        },
        editLabel: function(index){
            this.showLabels = false;
            this.modifyLabel = true;
            this.editedLabel = index;
            this.editedIdLabel = this.labels[index].id;
            this.labelName = this.labels[index].text;
            this.labelColor = this.labels[index].color;
            this.btnEditLabel = "Edit";
        },
        onEditLabel(index){
            if(this.modifyLabel && this.editedLabel > -1){
                this.labelsService.modifyLabel(this.editedLabel, this.labelName, this.labelColor);
            } else if(this.addLabel) {
                this.labelsService.addLabel({text: this.labelName, color: this.labelColor});
            }
            this.reset();
        },
        onAddNewLabel($event){
            this.showLabels = false;
            this.addLabel = true;
            this.btnEditLabel = "Create";
        },
        onCloseAddNewLabel(){
            this.showLabels = true;
            this.addLabel = false;
            this.modifyLabel = false;
            this.labelName = '';
            this.labelColor = '';
        },
        selectColor(color){
            this.labelColor = color;
        },
        onDeleteLabel(){
            this.labelsService.deleteLabel(this.editedLabel);
            this.reset();
        },
        reset(){
            this.showLabels = true;
            this.modifyLabel = false;
            this.addLabel = false;
            this.editedLabel = -1;
            this.labelName = '';
            this.labelColor = '';
        }
    },
    mounted(){
        this.onResizeSubscription = true;
        this.onResize();
        window.addEventListener('resize', this.onResize);
        this.labelSubscription = this.labelsService.labels.subscribe( labels => {
            this.labels = labels;
        });
    },
    beforeDestroy(){
        if(this.onResizeSubscription){
            this.onResizeSubscription = false;
            window.removeEventListener('resize', this.onResize);
        }
        if(this.labelSubscription){
            this.labelSubscription.unsubscribe();
        }
    }
}
</script>

<style scoped>

.card-option-edit-labels{
    position: absolute;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 1px 3px 0px #000000cc;
    width: 100%;
    padding-bottom: 5px;
    z-index: 50;
}

.card-option-edit-labels-header{
    border-bottom: 1px solid #ccc;
    padding: 5px;
    text-align: center;
}

.card-option-edit-labels-header h4{
    display: inline-block;
    margin: 3px 0px;
}

.card-option-edit-labels-header-close{
    float: right;
    padding: 5px;
    margin-right: 2px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}

.card-option-edit-labels-body{
    padding: 3px 8px;
    overflow-y: auto;
}

.label{
    margin: 5px auto;
    position: relative;
    min-height: 20px;
    display: block;
    display: flex;
    flex-direction: row;
}

.label-inner-edit{
    background-color: whitesmoke;
    padding: 7px;
    border-radius: 3px;
    cursor: pointer;
    flex-grow: 0;
}

.label-inner-edit:hover{
    background-color: rgb(200, 200, 200);
}

.label-inner{
    padding: 7px;
    border-radius: 3px;
    transition: box-shadow ease-in-out 0.1s, margin-left ease-in-out 0.15s;
    cursor: pointer;
    word-break: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    overflow: hidden;
    margin-right: 5px;
    flex-grow: 1;
    position: relative;
}

.label-inner:hover{
    margin-left: 4px;
}

.label-inner.red, .label-edit-color.red{
    background-color: rgb(207, 78, 78);
    color: rgb(75, 0, 0);
}

.label-inner.red:hover{
    box-shadow: -7px 0px 0px 0px rgb(156, 57, 57);
}

.label-edit-color.red:hover{

}

.label-inner.green, .label-edit-color.green{
    background-color: rgb(57, 207, 57);
    color: rgb(0, 38, 5);
}

.label-inner.green:hover{
    box-shadow: -7px 0px 0px 0px  rgb(40, 105, 40);
}

.label-edit-color.green:hover{

}

.label-inner.blue, .label-edit-color.blue{
    background-color: rgb(97, 157, 232);
    color: rgb(25, 40, 59);
}

.label-inner.blue:hover{
    box-shadow: -7px 0px 0px 0px rgb(45, 67, 95);
}

.label-edit-color.blue:hover{

}

.label-inner.orange, .label-edit-color.orange{
    background-color: rgb(255, 142, 46);
    color: rgb(75, 42, 9);
}

.label-inner.orange:hover{
    box-shadow: -7px 0px 0px 0px rgba(195, 95, 10, 1);
}

.label-edit-color.orange:hover{

}

.label-inner.yellow, .label-edit-color.yellow{
    background-color: rgb(222, 199, 41);
    color: rgb(80, 69, 0);
}

.label-inner.yellow:hover{
    box-shadow: -7px 0px 0px 0px rgba(140, 115, 0, 1);
}

.label-edit-color.yellow:hover{

}

.label-inner.purple, .label-edit-color.purple{
    background-color: rgb(105, 93, 170);
    color: rgb(248, 239, 255);
}

.label-inner.purple:hover{
    box-shadow: -7px 0px 0px 0px rgb(57, 49, 99);
}

.label-edit-color.purple:hover{

}

.label-inner.gray, .label-edit-color.gray{
    background-color: rgb(139, 139, 139);
    color: rgb(0, 0, 0);
}

.label-inner.gray:hover{
    box-shadow: -7px 0px 0px 0px rgb(50, 50, 50);
}

.label-edit-color.gray:hover{

}

.label-inner.black, .label-edit-color.black{
    background-color: rgb(41, 41, 41);
    color: rgb(255, 255, 255);
}

.label-inner.black:hover{
    box-shadow: -7px 0px 0px 0px rgb(0, 0, 0);
}

..label-edit-color.black:hover{
    
}

.label-inner.white, .label-edit-color.white{
    background-color: rgba(225, 225, 225, 1);
    color: rgb(0, 0, 0);
}

.label-inner.white:hover{
    box-shadow: -7px 0px 0px 0px rgb(130, 130, 130);
}

.label-edit-color.white:hover{

}

.label-inner-selected{
    position: absolute;
    right: 4px;
    padding: 3px 3px;
    background-color: #03030359;
    color: #ffffff;
    border-radius: 3px;
    font-size: 12px;
}

.label-new{
    background-color: lightgray;
    border-radius: 3px;
    cursor: pointer;
    text-align: left;
    padding: 3px 5px;
    margin-top: 20px;
}

.label-new:hover{
    background-color: #ccc;
}

.back-arrow{
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    padding: 10px;
}

.label-edit-color-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
}

.label-edit-color{
    display: grid;
    height: 40px;
    width: 40px;
    margin: 5px;
    border-radius: 3px;
    cursor: pointer;
}

.label-edit-pick-color{
    height: 20px;
    display: block;
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
    /* background: blueviolet; */
    border-style: dashed;
}

.selected{
    box-shadow: 0px 0px 0px 3px rgb(0, 195, 255);
}
.label-edit-pick-color input{
    /* width: 0;
    height: 0;
    opacity: 0; */
}
</style>
