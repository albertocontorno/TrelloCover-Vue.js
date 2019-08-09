<template>
    <textarea 
        ref="textarea"
        :value="iValue"
        v-on:input="$emit('input', $event.target.value)"
        :class="classes"
    ></textarea>
</template>

<script>
export default {
    name: "AutoresizeTextarea",
    props: ['iValue', 'iInitialSize', 'classes'],
    model: {
        prop: 'iValue',
        event: 'input'
    },
    data(){
        return {
            currentSize: this.iInitialSize || 25,
        }
    },
    methods:{
        resize(){
            this.$refs['textarea'].style.height = 'auto';
            this.$refs['textarea'].style.height = this.$refs['textarea'].scrollHeight + 'px';                
        }
    },
    mounted(){
        setTimeout(this.resize.bind(this), 10);
        this.$refs['textarea'].addEventListener('input', this.resize);
    },
    beforeDestroy(){
      this.$refs['textarea'].removeEventListener('input', this.resize); 
    }

}
</script>

<style scoped>
textarea{
    background: none;
    border: none;
    resize: none;
    height: 25px;
    width: 100%;
    margin-right: 25px;
    padding: 0;
    padding-top: 2px;
}

textarea:focus{
    outline: none;
    background-color: white;
}
</style>


