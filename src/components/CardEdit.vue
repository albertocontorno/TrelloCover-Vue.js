<template>

  <div v-bind:id="id" class="card-edit">
    <div class="card-editor-back" v-on:click="hide($event)"></div>
    <div class="card-editor-container" v-on:click="stopPropagation($event)">

      <div class="card-textarea-container">
        <div class="card-textarea-bg">
          <Label v-for="(label, index) in iLabels" v-bind:key="index" v-bind:text="label.text" v-bind:color="label.color"/>
          <AutoresizeTextarea v-model="text" classes="font-110 font-20"/>
        </div>
        <button class="button" v-on:click="save()">Save</button>
      </div>
      <div class="card-options-container slide-in-left">
        <div class="card-option-wrapper">
          <span class="card-option" v-on:click="editLabels()"><font-awesome-icon icon="tags"/> Edit Labels</span>
          <EditLabels v-if="showEditLabels" :iLabels="iLabels"
            @closeLabels="closeEditLabels()"
            @selectLabel="onSelectLabel($event)" 
            @edit-label="onEditLabel($event)"
            @add-label="onAddNewLabel($event)"
            @delete-label="onDeleteLabel($event)"
          />
        </div>
        <div class="card-option-wrapper">
          <span class="card-option"><font-awesome-icon icon="user"/> Change Members</span>
        </div>
        <div class="card-option-wrapper">
          <span class="card-option"><font-awesome-icon icon="arrow-right"/> Move</span>
        </div>
        <div class="card-option-wrapper">
          <span class="card-option"><font-awesome-icon icon="clone"/> Copy</span>
        </div>
        <div class="card-option-wrapper">
          <span class="card-option"> <font-awesome-icon icon="clock"/> Change Due Date</span>
        </div>
        <div class="card-option-wrapper">
          <span class="card-option"><font-awesome-icon icon="archive"/> Archive</span>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import Label from './Label';
import AutoresizeTextarea from './AutoresizeTextarea';
import EditLabels from './EditLabels';

var nextId = 0;
export default {
  name: 'CardEdit',
  props: ['iText', 'iLabels'],
  components:{
    Label,
    AutoresizeTextarea,
    EditLabels
  },
  data () {
    return {
      text: '',
      id: 'card-edit' + nextId++,
      showEditLabels: false
    }
  },
  methods: {
    save(){
      this.$emit("close-edit");
      this.$emit("update-text", this.text);
    },
    hide($event){
      this.$emit("close-edit");
      $event.stopPropagation();
    },
    editLabels(){
      this.showEditLabels = true;
    },
    closeEditLabels(){
      this.showEditLabels = false;
    },
    textarea_listener(){
      this.$refs['textarea'].style.height = this.$refs['textarea'].scrollHeight + 'px';
    },
    stopPropagation(event){event.stopPropagation();},
    onSelectLabel(label){
      this.$emit('select-label', label);
    },
    onEditLabel(label){
      this.$emit('edit-label', label);
    },
    onAddNewLabel(newLabel){
      this.$emit('add-label', newLabel);
    },
    onDeleteLabel(label){
      this.$emit('delete-label', label);
    }
  },
  mounted(){
    this.text = this.iText;
  },
  beforeDestroy(){

  }
}
</script>

<style scoped>

.card-edit{
  padding: 5px;
  width: 180%;
  max-height: 200px;
  z-index: 999;
  position: absolute;
  top: -1px;
  left: -1px;
  cursor: default;
}

.card-editor-back{
  background: rgba(0,0,0,.6);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
  cursor: default;
}

.card-textarea{
  width: 100%;
  max-height: 200px;
  resize: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 0;
  border-radius: 3px;
  background-color: #fff;
  outline: none;
  margin-top: 3px;
  padding-right: 5px;
}

.card-textarea-container{
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 2px;
  width: 279px;
}

.card-textarea-bg{
    border-radius: 3px;
    background-color: #fff;
    margin-bottom: 5px;
    padding: 5px 4px 0 5px;
    font-weight: 400!important;
}

.card-options-container{
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
}

.card-option-wrapper{
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: default;
}

.card-option{
  background-color: rgba(0,0,0,.5);
  border-radius: 3px;
  color: #fff;
  padding: 4px 10px;
  font-size: 14px;
  transition: margin 0.2s;
  cursor: pointer;
}

.card-option:hover{
  background-color: rgba(0,0,0,.9);
  margin-left: 10px;
}

.card-option-edit-labels{
  position: absolute;
  background-color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 0px #000000cc;
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
  padding: 3px 5px;
}

.button{
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

.button:active, .button:focus{
  outline: none;
  background-color: rgb(54, 129, 52);
  box-shadow: none;
}

/* ----------------------------------------------
 * Generated by Animista on 2019-5-11 10:54:18
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-in-left
 * ----------------------------------------
 */
.slide-in-left {
	-webkit-animation: slide-in-left 0.1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 0s both;
	        animation: slide-in-left 0.1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 0s both;
}

@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-20px);
            transform: translateX(-20px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-20px);
            transform: translateX(-20px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
</style>
