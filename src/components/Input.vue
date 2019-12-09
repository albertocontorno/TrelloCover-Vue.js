<template>

    <div :class="{'focussed': focussed}" class="container">
        <span v-if="iIcon" class="input-icon"><font-awesome-icon :icon="iIcon" class="close"/></span>
        <input 
            ref="input"
            :value="iValue"
            :type="iType || 'text'"
            v-on:input="$emit('input', $event.target.value)"
            @blur="$emit('blur', $event); focussed = false"
            @focus="focussed = true"
            :autofocus="autofocus"
        >
    </div>

</template>

<script>

export default {
    name: "Input",
    props: ['iValue', 'iAutofocus', 'iType', 'iIcon'],
    model: {
        prop: 'iValue',
        event: 'input'
    },
    data(){
        return {
            model: '',
            autofocus: this.iAutofocus,
            focussed: false
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
    outline: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
}

.container{
    border-radius: 3px; 
    border: 2px solid #ccc;
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
}

/* input:focus{
    border: 2px solid dodgerblue;
} */

.input-icon{
    margin-left: 5px;
}

.focussed{
    border-radius: 3px;
    border: 2px solid dodgerblue;
}
</style>
