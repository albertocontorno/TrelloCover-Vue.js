<template>
    <span  class="user-badge-circle">
        <span class="user-badge-circle-initials" title="username">
            {{initials}}
        </span>
    </span>
</template>

<script>
export default {
    name: 'user-badge',
    props: ['username', 'initials']
}
</script>

<style scoped>
.user-badge-circle{
    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-color: lightgray;
    display: block;
    text-align: center;
}

.user-badge-circle:hover{
    background-color: rgb(182, 182, 182);
}

.user-badge-circle-initials{
    color: black;
    font-size: 12px;
    font-weight: bold;
    font-family: monospace;
    vertical-align: sub;
}
</style>
