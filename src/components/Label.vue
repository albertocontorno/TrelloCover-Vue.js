<template>
    <span class="card-label" v-bind:class="color">{{text}}</span>
</template>

<script>
export default {
    name: "Label",
    props: ['text', 'color']
}
</script>

<style scoped>
.card-label{
    text-align: center;
    font-weight: bolder;
    font-family: monospace;
    font-size: 90%;
    color: black;
    border-radius: 3px;
    padding: 2px 9px;
    margin-right: 4px;
    display: inline-block;
    margin-bottom: 2px;
}

.card-label.red{
    background-color: rgb(207, 78, 78);
    color: rgb(75, 0, 0);
}

.card-label.green{
    background-color: rgb(57, 207, 57);
    color: rgb(0, 38, 5);
}

.card-label.blue{
    background-color: rgb(97, 157, 232);
    color: rgb(25, 40, 59);
}

.card-label.orange{
    background-color: rgb(255, 142, 46);
    color: rgb(75, 42, 9);
}

.card-label.yellow{
    background-color: rgb(222, 199, 41);
    color: rgb(80, 69, 0);
}

.card-label.purple{
    background-color: rgb(105, 93, 170);
    color: rgb(248, 239, 255);
}

.card-label.gray{
    background-color: rgb(139, 139, 139);
    color: rgb(0, 0, 0);
}

.card-label.black{
    background-color: rgb(41, 41, 41);
    color: rgb(255, 255, 255);
}

.card-label.white{
    background-color: rgba(225, 225, 225, 1);
    color: rgb(0, 0, 0);
}
</style>



