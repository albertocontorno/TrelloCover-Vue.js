<template>
    <div class="activity-container">
        <template v-if="!isComment">
            <div class="activity-description">
                <strong>Alberto Contorno</strong>
                ha spostato questa scheda da New Features a Planned
                <!-- <div class="activity-date">{{Iactivity.date.toDate().toUTCString()}}</div> -->
            </div>
            <hr>
        </template>

        <template v-if="isComment">
            <div>
                <strong>{{Iactivity.user.username}}</strong>
                <span class="activity-date"> {{data}}</span>
            </div>
            <div v-if="editingComment" class="comment-text-edit">
                <AutoresizeTextarea v-model="newCommentText" iAutoFocus="true" class="comment-edit-input"></AutoresizeTextarea>
                <Button :label="'Save'" classes="success" class="margin-tbr-5" @click="onEditComment()" :disabled="(newCommentText == '')"/>
                <font-awesome-icon icon="times" class="close" @click="onCloseEditingComment()"/>
            </div>
            <template v-if="!editingComment">
                <div class="comment-text">{{Iactivity.text}}</div>
                <div class="comment-actions margin-t--5"> 
                    <span @click="onDeleteComment()">Delete</span> 
                    - 
                    <span @click="editComment()">Edit</span>
                </div>
            </template>
        </template>

        
        
    </div>
</template>

<script>
import AutoresizeTextarea from './AutoresizeTextarea';
import Button from './Button';

export default {
    name: 'ActivityLog',
    props: ['isComment', 'Iactivity'],
    data(){
        return {
            editingComment: false,
            newCommentText: null,
        }
    },
    components: {
        AutoresizeTextarea,
        Button
    },
    computed:{
        data: function(){
            /* if(new Date().getUTCMonth() === this.Iactivity.date.toDate().getUTCMonth() 
                && new Date().getUTCFullYear() === this.Iactivity.date.toDate().getUTCFullYear() 
                && this.Iactivity.date.toDate().getUTCDate() - new Date().getUTCDate() > 0){
                return new Date().getUTCHours() - this.Iactivity.date.toDate().getUTCHours()
            } */
            return this.Iactivity.date.toDate ? this.Iactivity.date.toDate().toUTCString() : this.Iactivity.date.toUTCString();
        }
    },
    methods: {
        onDeleteComment(){
            this.$emit('delete-comment');
        },
        editComment(){
            this.editingComment = true;
            this.newCommentText = this.Iactivity.text;
        },
        onEditComment(){
            console.log("SAVE EDIT COMMENT", this.newCommentText);
            this.Iactivity.text = this.newCommentText;
            this.onCloseEditingComment();
            this.$emit('save-comments');
        },
        onCloseEditingComment(){
            this.editingComment = false;
            this.newCommentText = null;
        }
    },
    beforeDestroy(){
        this.onCloseEditingComment();
    }
}
</script>

<style scoped>
.activity-container{
    font-size: 14px;
    font-weight: 400;
}

.activity-description{

}

.comment-text{
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 2px;
    font-size: 16px!important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;    
    padding: 4px 7px;
    margin-top: 3px;
    display: inline-block;
}

.comment-text-edit{
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 2px;
    font-size: 16px!important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;    
    padding: 4px 7px;
    margin-top: 3px;
}

.comment-edit-input{
    font-size: 16px!important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;    
}

.comment-actions span{
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
}

.activity-date{
  font-weight: 200;
  font-size: 12px; 
}

.close{
    margin-left: 10px;
    position: relative;
    top: 5px;
    left: 5px;
    font-size: 21px;
    cursor: pointer;
}
</style>


