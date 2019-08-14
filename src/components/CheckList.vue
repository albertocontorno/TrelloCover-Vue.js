<template>
    <div>
        <div class="row">
            <div class="col">
                <font-awesome-icon icon="check-square"/> Titolo Checklist
                <button style="float:right">Delete</button>
            </div>
        </div>
        <ProgressBar iValue="50%"/>
        <div class="row">
            <div class="col">
                <font-awesome-icon icon="square"/> Testo todo
            </div>
        </div>
         <div class="row">
            <div class="col">
                <font-awesome-icon icon="square"/> Testo todo
            </div>
        </div>
         <div class="row">
            <div class="col">
                <font-awesome-icon icon="square"/> Testo todo
            </div>
        </div>
         <div class="row">
            <div class="col">
                <button>Add Item</button>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressBar from './ProgressBar';
export default {
    name: 'checklist',
    components: {
        ProgressBar
    }
}
</script>

<style scoped>

</style>
