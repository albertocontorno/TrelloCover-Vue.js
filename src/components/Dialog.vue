<template>
    <div v-if="show__" class="modal-background" v-on:click="hide($event)">
        <div class="modal-container">
            <div clasS="modal-content" v-on:click="intercept($event)">
                <div class="modal-header-title">
                    {{text}}
                </div>
                <div class="modal-body">
                    {{comment}}
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Button from './Button';
import {ModalController} from '../js/modalController.js';
export default {
    name: 'Dialog',
    components:{
        Button
    },
    inject: ['modalsService'],
    data(){
        return {
            show__: false,
            text: 'TestTestTestTestTestTestTestTestTestTestTestT',
            comment: '',
            user: {initials: 'AC', username: 'Alberto Contorno'},
            showMoreDetails: false,
            detail: '',
            controller: new ModalController()
        }
    },
    methods: {
        show(){
            //this.textarea_listener();
            this.show__ = true;
        },
        hide($event){
            this.show__ = false;
            //this.text = 'TestTestTestTestTestTest';
            if($event) $event.stopPropagation();
        },
        intercept($event){
            if($event) $event.stopPropagation();
        },
        toggle(data){
            this.show__ = !this.show__;
            this.text = data.text;
            this.comment = data.comment;

        },
        addMoreDetails(){
            this.showMoreDetails = true;
        },
        closeMoreDetails(){
            this.showMoreDetails = false;
        }
    },
    mounted: function(){
        this.controller = this.modalsService.registerModal('mainDialog', this);
    },
    beforeDestroy(){
        this.modalsService.unregisterModal('mainDialog');
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
