<template>
    <div class="navbar-container">
        <!-- <span >Boards</span> -->
        <router-link to="/boards" class="navbar-standard-button">Boards</router-link>
        <span class="float-right" style="cursor: pointer" @click="$emit('logout')">Logout</span>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
a{
    color: white;
}

.navbar-container{
    padding: 5px 10px;
    background-color: #1949a5;
    position: static;
    font-weight: bold;
    color: black;
}

.navbar-standard-button{
    padding: 5px 10px;
}

.navbar-standard-button:hover{
    background-color: darkgreen;
    cursor: pointer;
}
</style>

