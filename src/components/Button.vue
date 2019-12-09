<template>
  <button :class="classes" v-on:click="$emit('click', $event)" :title="label" :disabled="innerDisabled">
    <span class="float-left"><slot></slot></span>
    <span>{{label}}</span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ['label', 'disabled', 'classes'],
  computed: {
    innerDisabled: function(){
      return this.disabled;
    }
  }
}
</script>

<style scoped>
button{
  border-radius: 4px;
  font-weight: bold;
  padding: 5px 15px;
  box-shadow: 1px 1px 1px 0px #000000cc;
}

button.lg{
  font-weight: bold;
  padding: 10px 20px;
}

button.sm{
  font-weight: bold;
  padding: 3px 8px;
}

button:hover{
  cursor: pointer;
}

button:active{
  outline:none;
  box-shadow: none;
}

button:focus{
  outline:none;
}

button:disabled{
  cursor: not-allowed;
  opacity: 0.6;
}

button:disabled{
  cursor: not-allowed;
  opacity: 0.6;
}

.success{
  background-color: rgb(77, 190, 74);
  border: 1px solid darkgreen;
  color: black;
}

.success:hover{
  background-color: rgb(68, 165, 65);
}

.error{
  background-color: rgb(228, 49, 4);
  border: 1px solid rgb(158, 32, 0);
  color: black;
}

.error:hover{
  background-color: rgb(206, 41, 0);
}

.error:active{
  background-color: rgb(189, 38, 0);
}

.warning{
  background-color: rgb(255, 230, 3);
  border: 1px solid rgb(214, 193, 4);
  color: black;
}

.warning:hover{
  background-color: rgb(241, 217, 1);
}

.info{
  background-color: rgb(0, 102, 255);
  border: 1px solid rgb(0, 84, 209);
  color: black;
}

.info:hover{
  background-color: rgb(0, 96, 240);
}

.dark{
  background-color: rgb(24, 24, 24);
  border: 1px solid rgb(0, 0, 0);
  color: black;
}

.dark:hover{
  background-color: rgb(22, 22, 22);
}

.neutral{
  background: #e3e3e3;
  border: 1px solid gray;
  box-shadow: 1px 1px 1px 0px #161616ad;
  color: black;
}

.neutral:hover{
  background: lightgray;
}

.neutral:active{
  background: rgb(153, 153, 153);
}

.light{
  background-color: rgb(247, 247, 247);
  border: 1px solid rgb(241, 241, 241);
  color: black;
}

.light-gray{
    background: #e3e3e3;
    border: 0;
    border-bottom: 1px solid gray; 
    border-radius: 3px;
    outline: none;
    /* float: right; */
}

.light-gray:hover{
    background: lightgray;
    cursor: pointer;
    outline: none;
}

.no-border{
  border: none;
}

.no-shadow{
  box-shadow: none;
}

</style>
