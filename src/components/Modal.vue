<template>

    <div v-if="show__" class="modal-background" v-on:click="hide($event)">
        <div class="modal-container">
            <div clasS="modal-content" v-on:click="intercept($event)">
                <div class="modal-header">
                    <div class="modal-header-title">
                        <div class="modal-header-icon left-icon"><font-awesome-icon icon="chalkboard"/></div>
                        <div class="modal-header-text">
                            <AutoresizeTextarea v-model="text" classes="font-bold font-20" @blur="saveText()"/>
                            <div class="modal-header-text-sub">in lista {{listTitle}}</div>
                            <div class="modal-header-labels">
                                <Label v-for="label of labels" :key="label.id" v-bind:text="label.text" v-bind:color="label.color"/>
                                <div style="max-width: 250px; position: absolute; right: 0; left:0;"></div>
                            </div>
                            <span class="modal-header-close" v-on:click="hide($event)"><font-awesome-icon icon="times"/></span> 
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-body-left-col">
                        <div class="modal-body-left-row first">
                            <div class="modal-body-left-row-left"><font-awesome-icon class="left-icon" icon="align-left"/></div>
                            <div class="modal-body-left-row-right">
                                Description
                                <div class="modal-gray-area" v-on:click="addMoreDetails()" v-if="!showMoreDetails && !detail">Add a more detailed description...</div>
                                <div class="modal-gray-area" v-on:click="addMoreDetails(detail)" v-if="!showMoreDetails && detail">{{detail}}</div>

                                <div v-if="showMoreDetails">
                                    <AutoresizeTextarea class="modal-comment" v-model="detail" iAutoFocus="true"/>
                                    <div>
                                        <Button label="Save" classes="success" @click="onSaveDescription()"/>
                                        <font-awesome-icon icon="times" class="modal-close-more-details" v-on:click="closeMoreDetails()"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-body-left-row no-margin-bottom">
                            <div class="modal-body-left-row-left"><font-awesome-icon class="left-icon" icon="comment"/></div>
                            <div class="modal-body-left-row-right">
                                Add Comment
                            </div>
                        </div>
                        <div class="modal-body-left-row no-margin-top">
                            <div class="modal-body-left-row-left"><UserBadge :initials="user.initials" :username="user.username" /></div>
                            <div class="modal-body-left-row-right">
                                <AutoresizeTextarea class="modal-comment" v-model="comment"/>
                                <Button label="Save" classes="success"/>
                            </div>
                        </div>
                        <div class="modal-body-left-row no-margin-bottom"  v-for="(checklist, index) of checkLists" :key="index">
                            <div class="modal-body-left-row-left"><font-awesome-icon class="left-icon" icon="check"/></div>
                            <div class="modal-body-left-row-right">
                                <CheckList :iItems="checklist.items" :iTitle="checklist.title"/>
                            </div>
                        </div>
                        <div class="modal-body-left-row no-margin-bottom">
                            <div class="modal-body-left-row-left"><font-awesome-icon class="left-icon" icon="list"/></div>
                            <div class="modal-body-left-row-right">
                                Activities <span style="float:right"><button class="modal-body-button modal-hide-details">Hide Details</button></span>
                            </div>
                        </div>
                        <div v-for="a in [1,2,3]" class="modal-body-left-row">
                            <div class="modal-body-left-row-left"><UserBadge :initials="user.initials" :username="user.username" /></div>
                            <div class="modal-body-left-row-right">
                                <ActivityLog/>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body-right-col">
                        <div class="modal-body-buttons-title first">ADD TO CARD</div>
                        <ul class="modal-body-buttons-container">
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="user"/>Members</button></li>
                            <li>
                                <EditLabels v-if="showEditLabels" :iLabels="labels" @closeLabels="closeEditLabels()" @selectLabel="onSelectLabel($event)"/>
                                <button class="modal-body-button" @click="openEditLabels()"><font-awesome-icon class="icon-right" icon="tags"/>Labels</button>
                            </li>
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="check-square"/>Checklist</button></li>
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="clock"/>Deadline</button></li>
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="paperclip"/>Attachment</button></li>
                        </ul>
                        <div class="modal-body-buttons-title">ACTIONS</div>
                        <ul class="modal-body-buttons-container">
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="arrow-right"/>Move</button></li>
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="copy"/>Copy</button></li>
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="eye"/>Watch</button></li>
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="archive"/>Archive</button></li>
                            <li><button class="modal-body-button"><font-awesome-icon class="icon-right" icon="share-alt"/>Share</button></li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="modal-footer">Fooooter <button>adas</button></div> -->
            </div>

        </div>
    </div>
</template>

<script>
import {ModalController} from '../js/modalController.js';
import AutoresizeTextarea from './AutoresizeTextarea';
import UserBadge from './UserBadge';
import CheckList from './CheckList';
import ActivityLog from './ActivityLog';
import Button from './Button';
import Label from './Label';
import EditLabels from './EditLabels';

export default {
    name: "Modal",
    props: ['iUser'],
    inject: ['modalsService'],
    data(){
        return {
            show__: false,
            text: 'TestTestTestTestTestTestTestTestTestTestTestT',
            comment: '',
            //TODO
            user: {initials: 'AC', username: 'Alberto Contorno'},
            showMoreDetails: false,
            detail: null,
            listTitle: '',
            labels: [],
            checkLists: [],
            controller: null,
            showEditLabels: false,
            data: null
        }
    },
    components:{
        AutoresizeTextarea,
        UserBadge,
        ActivityLog,
        Button,
        Label,
        CheckList,
        EditLabels
    },
    methods: {
        show(data){
            //this.textarea_listener();
            console.log("OPEN MODAL", data);
            this.show__ = true;
            this.detail = data.description;
        },
        hide($event){
            this.show__ = false;
            this.showMoreDetails = false;
            this.showEditLabels = false;
            this.detail = '';
            this.comment = '';
            this.labels = [];
            this.data = null;
            //this.text = 'TestTestTestTestTestTest';
            if($event) $event.stopPropagation();
        },
        intercept($event){
            if($event) $event.stopPropagation();
        },
        toggle(data){
            console.log("TOGGLE MODAL", data);
            this.show__ = !this.show__;
            this.text = data.text;
            this.detail = data.description;
            this.listTitle = data.listTitle;
            this.labels = data.labels;
            this.data = data;
        },
        addMoreDetails(detail){
            /* if(detail){
                this.detail = detail;
            } */
            this.showMoreDetails = true;
        },
        closeMoreDetails(){
            this.showMoreDetails = false;
        },
        openEditLabels(){
            console.log('open')
            this.showEditLabels = true;
        },
        closeEditLabels(){
            this.showEditLabels = false;
        },
        onSelectLabel(label){
            const index = this.labels.findIndex( l => l.id === label.id);
            if(index >= 0){
                this.labels.splice(index, 1);
            } else {
                this.labels.push(label);
            }
            this.$emit('save-card-labels', {card: {id: this.data.cardId, labels: this.labels}, list: {id: this.data.listId} } );
        },
        onSaveDescription(){
            this.closeMoreDetails();
            this.$emit('save-description', {data: this.data, detail: this.detail});
        },
        saveText(){
            console.log("SAVE TEXT FROM MODAL");
        }
    },
    mounted: function(){
        this.controller = this.modalsService.registerModal('cardAdvancedEditModal', this);
        this.checkLists.push(
            {items: [
                {text: 'todo 1 asdasd adsdasd ', done: true},
                {text: 'todo 2 asd dsd d adsdasd ', done: true},
                {text: 'todo 3 353 adsd fdfd3sd ', done: false},
                {text: 'todo 4 sdg4 adsdf asd ', done: true},
                {text: 'todo 4 sdg4 adsdf asd ', done: false},
            ], title: 'Test CheckList 1'}
        );
        this.checkLists.push({items: [
                {text: 'w 2321 eee adsdasd ', done: false},
                {text: 'fef 21312 adsdasd ', done: true},
            ], title: 'Test CheckList 2'});
    },
    beforeDestroy(){
        this.modalsService.unregisterModal('cardAdvancedEditModal');
    }
}
</script>

<style scoped>

.modal-background{
position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgb(0,0,0,0.6);
    z-index: 90;
    overflow-y: auto;
}

.modal-container{
    border-radius: 5px;
    min-height: 20px;
    min-width: 20px;
    z-index: 100;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 1.75rem auto;
    display: flex;
    -ms-flex-align: center;
    position: relative;
}

.modal-main{
    max-width: 500px;
    max-height: 1;
    margin: 1.75rem auto;
    background-color: transparent;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.modal-content{
    min-height: 25%;
    min-width: 500px;
    max-width: 50%;
    padding: 10px;
    margin: 0 auto;
    position: relative;
    display: -ms-flexbox;
    display: block;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    border-radius: 3px;
    background-color: #f4f5f7;
    box-shadow: 1px 1px 5px 1px black;
}

.modal-header{

}

.modal-header-icon{
    margin-top: 6px;
    min-width: 32px;
}

.modal-header-title{
    margin-right: 30px;
    display: flex;
}

.modal-header-text{
    flex-grow: 1;
}

.modal-header-text-sub{

}

.modal-header-close{
    font-size: 20px;
    position: absolute;
    top: 2px;
    right: 3px;
    padding: 6px 11px;
}

.modal-header-close:hover{
    cursor: pointer;
    color: black;
    background-color: rgb(226, 225, 225);
    border-radius: 50%;
    transition: background-color 0.5s,color .5s;
}

.modal-header-close:active{
    cursor: pointer;
    color: black;
    background-color: #ccc;
    border-radius: 50%;
}

.modal-body{
    padding-top: 15px;
}

.modal-body-left-col{
    width: 75%;
    display: inline-block;
    vertical-align: top;
    word-break: break-word;
}

.modal-body-left-row{
    padding-right: 30px;
    display: flex;
    margin: 15px 0;
}

.modal-body-left-row.first{
    margin-top: 0;
    margin-bottom: 15px;
}

.modal-body-left-row-left{
    font-size: 17px;
    padding: 0px 0px;
    padding-right: 10px;
    min-width: 32px;
}

.modal-body-left-row-right{
    font-size: 17px;
    font-weight: bold;
    flex-grow: 1;
}

.modal-body-right-col{
    width: 25%;
    display: inline-block;
    vertical-align: top;
    word-break: break-word;
}

.modal-body-buttons-title{
    font-size: 12px;
    vertical-align: baseline;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
    font-weight: 500;
    letter-spacing: .04em;
    line-height: 16px;
    margin-top: 16px;
    text-transform: uppercase;
    line-height: 20px;
}

.modal-body-buttons-title.first{
    margin: 0;
}

.modal-body-buttons-container{
    list-style: none;
    padding: 0;
    margin: 0;
}

.modal-body-button{
    width: 100%;
    display: block;
    background: #e3e3e3;
    border: 0;
    border-bottom: 1px solid gray; 
    margin: 5px 0;
    padding: 5px;
    border-radius: 3px;
    outline: none;
}

.modal-body-button:hover{
    background: lightgray;
    cursor: pointer;
    outline: none;
}

.modal-body-button:active{
    background: #ccc;
    cursor: pointer;
    outline: none;
}

.modal-gray-area{
    background-color: lightgray;
    border-radius: 3px;
    padding: 10px;
    height: 25px;
    width:100%;
    font-size: 13px;
    font-weight: 400;
    margin-top: 5px;
}

.modal-gray-area:hover{
    background-color: rgb(182, 182, 182);
    cursor: pointer;
}

.modal-close-more-details{
    margin-left: 10px;
    position: relative;
    top: 5px;
    left: 5px;
    font-size: 21px;
    cursor: pointer;
}

.modal-hide-details{
    padding: 2px 19px;
    margin: 0;
    margin-top: -5px;
}

.modal-comment{
    background-color: whitesmoke;
    border: 1px solid lightgray;
    min-height: 75px;
    font-size: 14px;
    font-weight: 400;
}

.left-icon{
    margin-left: 10px;
}

li{
    position: relative;
}

/*TODO REMOVE*/
.button.success{
    background-color: rgb(77, 190, 74);
    border: 1px solid darkgreen;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    padding: 5px 15px;
    box-shadow: 1px 1px 1px 0px #000000cc;
}

.button:hover{
  background-color: rgb(68, 165, 65);
  border: 1px solid darkgreen;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  padding: 5px 15px;
  cursor: pointer;
}

.button:active{
  outline: none;
  background-color: rgb(54, 129, 52);
  box-shadow: none;
}
/*END REMOVE*/

.modal-footer{
    border-top: 0;
    padding: 0.3rem;
}

</style>
