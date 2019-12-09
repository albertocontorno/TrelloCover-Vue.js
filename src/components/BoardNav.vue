<template>
    <div class="main">
        <span class="board-title">{{iBoard.title}}</span>
        <Button label="Invite" classes="btn no-border no-shadow white lg" @click="openEditMembers()" ref="membersBtn"/>
        <EditMembers v-if="showEditMembers" @close-edit-members="closeEditMembers()" :style="memberClass"/>
        <div v-if="showEditMembers" class="members-edit-speudo" @click="closeEditMembers()"></div>
    </div>
</template>

<script>
import Button from './Button';
import EditMembers from './EditMembers';

export default {
    name: 'BoardNav',
    props: ['iBoard'],
    components:{
        Button,
        EditMembers
    },
    data(){
        return {
            showEditMembers: false,
            memberClass: {top: 0, left: 0, maxWidth: '250px'}
        }
    },
    methods: {
        openEditMembers(){
            this.memberClass.top = this.$refs['membersBtn'].$el.getBoundingClientRect().y + 10 + 'px';
            this.memberClass.left = this.$refs['membersBtn'].$el.getBoundingClientRect().x + 'px';
            this.showEditMembers = true;
        },
        closeEditMembers(){
            this.showEditMembers = false;
        }
    }
}
</script>

<style scoped>
.main{
    padding: 5px 15px;
    height: 35px;
    display: flex;
    background-color: #1976D2;
    align-items: center;
    position: relative;
}

.board-title{
    margin-right: 10px;
    font-weight: bold;
    font-size: 25px;
    vertical-align: bottom;
    color: whitesmoke;
}

.members-edit-speudo{
    z-index:49;
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: transparent;
}
</style>