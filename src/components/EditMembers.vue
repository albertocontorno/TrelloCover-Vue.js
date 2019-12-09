<template>
    <div class="card-option-edit-members" ref="modalBody">
        <div class="card-option-add-members-header">
            <!-- <span v-if="addLabel || modifyLabel" class="back-arrow" @click="onClose()"><font-awesome-icon icon="arrow-left"/></span> -->
            <h4>{{title}}</h4>
            <span class="card-option-add-members-header-close" v-on:click="onClose()"><font-awesome-icon icon="times"/></span>
        </div>
        <div class="card-option-add-members-body" :style="bodyStyle">
            <template v-if="!iEdit">
                Name or Id
                <Input v-model="membersTitle" iAutofocus="true" iIcon="search" @input="onInput()"/>
                <div v-if="usersFound.length > 0" class="dropdown">
                    <div v-for="user of usersFound" :key="user.username" class="user-element" @click="onSelectUser(user)">
                        <UserBadge :username="user.username" :initials="user.initials"/>
                        <span class="user-element-name">{{user.username}}</span>
                    </div>
                </div>
                <div v-if="selectedUser">
                    <div class="user-element selected">
                        <UserBadge :username="selectedUser.username" :initials="selectedUser.initials"/>
                        <span class="user-element-name">{{selectedUser.username}}</span>
                    </div>
                </div>
                <div>
                    <Button :label="'Save'" classes="success" class="margin-tbr-5" @click="onAddMember()" :disabled="(selectedUser == null)"/>
                    <font-awesome-icon icon="times" class="close" @click="onClose()"/>
                </div>
            </template>
            <template v-if="iEdit">
                <div v-for="user of usersBoard" :key="user.uid"  class="user-element" :class="classes" style="padding: 5px;">
                    <UserBadge :username="user.username" :initials="user.initials"/>
                    <span class="user-element-name">{{user.username}}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Button from './Button';
import Input from './Input';
import UserBadge from './UserBadge';

export default {
    name: 'EditMembers',
    props: ['iEdit', 'iMembers'],
    inject: ['usersService'],
    data() {
        return {
            title: 'Add Member',
            bodyStyle: null,
            membersTitle: null,
            usersFound: [],
            selectedUser: null,
            usersBoard: [],
            classes: ''
        }
    },
    components:{
      Button,
      Input,
      UserBadge 
    },
    methods: {
        onResize: function(){
            var rect = this.$refs['modalBody'].getBoundingClientRect();
            let style = {maxHeight: (window.innerHeight - rect.top - 55) + 'px'};
            this.bodyStyle = style;
        },
        onClose(){
            this.membersTitle = null,
            this.usersFound = [],
            this.selectedUser = null;
            this.$emit('close-edit-members');
        },
        onAddMember(){
            let newMember = this.membersTitle;
            this.$emit('add-member', newMember);
            this.onClose();
        },
        async onInput(){
            if(this.membersTitle.length > 3){
                this.usersFound = await this.usersService.searchUsers(this.membersTitle);
                console.log("usersFound",  this.usersFound)
            }
        },
        onSelectUser(user){
            this.usersFound = [];
            this.membersTitle = user.username;
            this.selectedUser = user;
            console.log("SELECTED USER", user);
        }
    },
    async mounted(){
        if(this.iEdit){
            this.title = 'Edit Members';
            this.usersBoard = await this.usersService.getUsers([...this.iMembers, 'aaavCvc53laUBqlRzxAjDebAXNdW2']);
        }
    },
    beforeDestroy(){
        this.selectedUser = null;
        this.usersFound = [];
        this.membersTitle = '';
    }
}
</script>

<style scoped>
.dropdown{
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.349);
    position: absolute;
    right: 8px;
    left: 8px;
    border-radius: 1px;
    z-index: 10;
    max-height: 100px;
    overflow-y: auto;
    padding: 3px 5px;
}
.dropdown div{
    padding: 5px 3px;
}

.close{
    margin-left: 10px;
    position: relative;
    top: 5px;
    left: 5px;
    font-size: 21px;
    cursor: pointer;
}

.card-option-edit-members{
    position: absolute;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 1px 3px 0px #000000cc;
    width: 100%;
    padding-bottom: 5px;
    z-index: 50;
}

.card-option-add-members-header{
    border-bottom: 1px solid #ccc;
    padding: 5px;
    text-align: center;
}

.card-option-add-members-header h4{
    display: inline-block;
    margin: 3px 0px;
}

.card-option-add-members-header-close{
    float: right;
    padding: 5px;
    margin-right: 2px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
}

.card-option-add-members-body{
    padding: 3px 8px;
    overflow-y: auto;
}

.user-element{
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;
}

.user-element:hover{
    background-color: whitesmoke;
}

.user-element.selected{
    cursor: default;
    margin-top: 5px;
    padding: 2px;
    box-shadow: 0px 0px 5px -1px #000000cc;
    border-radius: 3px;
}

.user-element-name{
    margin-left: 5px;
}
</style>