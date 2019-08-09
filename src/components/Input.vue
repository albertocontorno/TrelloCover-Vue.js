<template>

    <input 
        ref="input"
        :value="iValue"
        :type="iType || 'text'"
        v-on:input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
        :autofocus="autofocus"
    >

</template>

<script>

export default {
    name: "Input",
    props: ['iValue', 'iAutofocus', 'iType'],
    model: {
        prop: 'iValue',
        event: 'input'
    },
    data(){
        return {
            model: '',
            autofocus: this.iAutofocus,
        }
    },
    mounted(){
        if(this.autofocus){
            this.$refs['input'].focus();
        }
    }
}

</script>

<style scoped>
input{
    background: white;
    border: 0;
    padding: 5px;
    border-radius: 3px;
    outline: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
}

input:focus{
    border: 2px solid dodgerblue;
}
</style>
